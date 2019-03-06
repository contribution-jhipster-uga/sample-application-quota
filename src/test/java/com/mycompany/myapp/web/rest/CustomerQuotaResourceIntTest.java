package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.CustomerQuota;
import com.mycompany.myapp.repository.CustomerQuotaRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CustomerQuotaResource REST controller.
 *
 * @see CustomerQuotaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class CustomerQuotaResourceIntTest {

    private static final Integer DEFAULT_QUOTA = 1;
    private static final Integer UPDATED_QUOTA = 2;

    @Autowired
    private CustomerQuotaRepository customerQuotaRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCustomerQuotaMockMvc;

    private CustomerQuota customerQuota;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CustomerQuotaResource customerQuotaResource = new CustomerQuotaResource(customerQuotaRepository);
        this.restCustomerQuotaMockMvc = MockMvcBuilders.standaloneSetup(customerQuotaResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CustomerQuota createEntity(EntityManager em) {
        CustomerQuota customerQuota = new CustomerQuota()
            .quota(DEFAULT_QUOTA);
        return customerQuota;
    }

    @Before
    public void initTest() {
        customerQuota = createEntity(em);
    }

    @Test
    @Transactional
    public void createCustomerQuota() throws Exception {
        int databaseSizeBeforeCreate = customerQuotaRepository.findAll().size();

        // Create the CustomerQuota
        restCustomerQuotaMockMvc.perform(post("/api/customer-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerQuota)))
            .andExpect(status().isCreated());

        // Validate the CustomerQuota in the database
        List<CustomerQuota> customerQuotaList = customerQuotaRepository.findAll();
        assertThat(customerQuotaList).hasSize(databaseSizeBeforeCreate + 1);
        CustomerQuota testCustomerQuota = customerQuotaList.get(customerQuotaList.size() - 1);
        assertThat(testCustomerQuota.getQuota()).isEqualTo(DEFAULT_QUOTA);
    }

    @Test
    @Transactional
    public void createCustomerQuotaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = customerQuotaRepository.findAll().size();

        // Create the CustomerQuota with an existing ID
        customerQuota.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCustomerQuotaMockMvc.perform(post("/api/customer-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerQuota)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerQuota in the database
        List<CustomerQuota> customerQuotaList = customerQuotaRepository.findAll();
        assertThat(customerQuotaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCustomerQuotas() throws Exception {
        // Initialize the database
        customerQuotaRepository.saveAndFlush(customerQuota);

        // Get all the customerQuotaList
        restCustomerQuotaMockMvc.perform(get("/api/customer-quotas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(customerQuota.getId().intValue())))
            .andExpect(jsonPath("$.[*].quota").value(hasItem(DEFAULT_QUOTA)));
    }
    
    @Test
    @Transactional
    public void getCustomerQuota() throws Exception {
        // Initialize the database
        customerQuotaRepository.saveAndFlush(customerQuota);

        // Get the customerQuota
        restCustomerQuotaMockMvc.perform(get("/api/customer-quotas/{id}", customerQuota.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(customerQuota.getId().intValue()))
            .andExpect(jsonPath("$.quota").value(DEFAULT_QUOTA));
    }

    @Test
    @Transactional
    public void getNonExistingCustomerQuota() throws Exception {
        // Get the customerQuota
        restCustomerQuotaMockMvc.perform(get("/api/customer-quotas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCustomerQuota() throws Exception {
        // Initialize the database
        customerQuotaRepository.saveAndFlush(customerQuota);

        int databaseSizeBeforeUpdate = customerQuotaRepository.findAll().size();

        // Update the customerQuota
        CustomerQuota updatedCustomerQuota = customerQuotaRepository.findById(customerQuota.getId()).get();
        // Disconnect from session so that the updates on updatedCustomerQuota are not directly saved in db
        em.detach(updatedCustomerQuota);
        updatedCustomerQuota
            .quota(UPDATED_QUOTA);

        restCustomerQuotaMockMvc.perform(put("/api/customer-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCustomerQuota)))
            .andExpect(status().isOk());

        // Validate the CustomerQuota in the database
        List<CustomerQuota> customerQuotaList = customerQuotaRepository.findAll();
        assertThat(customerQuotaList).hasSize(databaseSizeBeforeUpdate);
        CustomerQuota testCustomerQuota = customerQuotaList.get(customerQuotaList.size() - 1);
        assertThat(testCustomerQuota.getQuota()).isEqualTo(UPDATED_QUOTA);
    }

    @Test
    @Transactional
    public void updateNonExistingCustomerQuota() throws Exception {
        int databaseSizeBeforeUpdate = customerQuotaRepository.findAll().size();

        // Create the CustomerQuota

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCustomerQuotaMockMvc.perform(put("/api/customer-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(customerQuota)))
            .andExpect(status().isBadRequest());

        // Validate the CustomerQuota in the database
        List<CustomerQuota> customerQuotaList = customerQuotaRepository.findAll();
        assertThat(customerQuotaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCustomerQuota() throws Exception {
        // Initialize the database
        customerQuotaRepository.saveAndFlush(customerQuota);

        int databaseSizeBeforeDelete = customerQuotaRepository.findAll().size();

        // Delete the customerQuota
        restCustomerQuotaMockMvc.perform(delete("/api/customer-quotas/{id}", customerQuota.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CustomerQuota> customerQuotaList = customerQuotaRepository.findAll();
        assertThat(customerQuotaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CustomerQuota.class);
        CustomerQuota customerQuota1 = new CustomerQuota();
        customerQuota1.setId(1L);
        CustomerQuota customerQuota2 = new CustomerQuota();
        customerQuota2.setId(customerQuota1.getId());
        assertThat(customerQuota1).isEqualTo(customerQuota2);
        customerQuota2.setId(2L);
        assertThat(customerQuota1).isNotEqualTo(customerQuota2);
        customerQuota1.setId(null);
        assertThat(customerQuota1).isNotEqualTo(customerQuota2);
    }
}
