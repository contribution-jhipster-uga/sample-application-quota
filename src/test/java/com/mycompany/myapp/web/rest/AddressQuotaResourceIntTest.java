package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.AddressQuota;
import com.mycompany.myapp.repository.AddressQuotaRepository;
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
 * Test class for the AddressQuotaResource REST controller.
 *
 * @see AddressQuotaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class AddressQuotaResourceIntTest {

    private static final Integer DEFAULT_QUOTA = 1;
    private static final Integer UPDATED_QUOTA = 2;

    @Autowired
    private AddressQuotaRepository addressQuotaRepository;

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

    private MockMvc restAddressQuotaMockMvc;

    private AddressQuota addressQuota;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final AddressQuotaResource addressQuotaResource = new AddressQuotaResource(addressQuotaRepository);
        this.restAddressQuotaMockMvc = MockMvcBuilders.standaloneSetup(addressQuotaResource)
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
    public static AddressQuota createEntity(EntityManager em) {
        AddressQuota addressQuota = new AddressQuota()
            .quota(DEFAULT_QUOTA);
        return addressQuota;
    }

    @Before
    public void initTest() {
        addressQuota = createEntity(em);
    }

    @Test
    @Transactional
    public void createAddressQuota() throws Exception {
        int databaseSizeBeforeCreate = addressQuotaRepository.findAll().size();

        // Create the AddressQuota
        restAddressQuotaMockMvc.perform(post("/api/address-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressQuota)))
            .andExpect(status().isCreated());

        // Validate the AddressQuota in the database
        List<AddressQuota> addressQuotaList = addressQuotaRepository.findAll();
        assertThat(addressQuotaList).hasSize(databaseSizeBeforeCreate + 1);
        AddressQuota testAddressQuota = addressQuotaList.get(addressQuotaList.size() - 1);
        assertThat(testAddressQuota.getQuota()).isEqualTo(DEFAULT_QUOTA);
    }

    @Test
    @Transactional
    public void createAddressQuotaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = addressQuotaRepository.findAll().size();

        // Create the AddressQuota with an existing ID
        addressQuota.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAddressQuotaMockMvc.perform(post("/api/address-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressQuota)))
            .andExpect(status().isBadRequest());

        // Validate the AddressQuota in the database
        List<AddressQuota> addressQuotaList = addressQuotaRepository.findAll();
        assertThat(addressQuotaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllAddressQuotas() throws Exception {
        // Initialize the database
        addressQuotaRepository.saveAndFlush(addressQuota);

        // Get all the addressQuotaList
        restAddressQuotaMockMvc.perform(get("/api/address-quotas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(addressQuota.getId().intValue())))
            .andExpect(jsonPath("$.[*].quota").value(hasItem(DEFAULT_QUOTA)));
    }
    
    @Test
    @Transactional
    public void getAddressQuota() throws Exception {
        // Initialize the database
        addressQuotaRepository.saveAndFlush(addressQuota);

        // Get the addressQuota
        restAddressQuotaMockMvc.perform(get("/api/address-quotas/{id}", addressQuota.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(addressQuota.getId().intValue()))
            .andExpect(jsonPath("$.quota").value(DEFAULT_QUOTA));
    }

    @Test
    @Transactional
    public void getNonExistingAddressQuota() throws Exception {
        // Get the addressQuota
        restAddressQuotaMockMvc.perform(get("/api/address-quotas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAddressQuota() throws Exception {
        // Initialize the database
        addressQuotaRepository.saveAndFlush(addressQuota);

        int databaseSizeBeforeUpdate = addressQuotaRepository.findAll().size();

        // Update the addressQuota
        AddressQuota updatedAddressQuota = addressQuotaRepository.findById(addressQuota.getId()).get();
        // Disconnect from session so that the updates on updatedAddressQuota are not directly saved in db
        em.detach(updatedAddressQuota);
        updatedAddressQuota
            .quota(UPDATED_QUOTA);

        restAddressQuotaMockMvc.perform(put("/api/address-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedAddressQuota)))
            .andExpect(status().isOk());

        // Validate the AddressQuota in the database
        List<AddressQuota> addressQuotaList = addressQuotaRepository.findAll();
        assertThat(addressQuotaList).hasSize(databaseSizeBeforeUpdate);
        AddressQuota testAddressQuota = addressQuotaList.get(addressQuotaList.size() - 1);
        assertThat(testAddressQuota.getQuota()).isEqualTo(UPDATED_QUOTA);
    }

    @Test
    @Transactional
    public void updateNonExistingAddressQuota() throws Exception {
        int databaseSizeBeforeUpdate = addressQuotaRepository.findAll().size();

        // Create the AddressQuota

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAddressQuotaMockMvc.perform(put("/api/address-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(addressQuota)))
            .andExpect(status().isBadRequest());

        // Validate the AddressQuota in the database
        List<AddressQuota> addressQuotaList = addressQuotaRepository.findAll();
        assertThat(addressQuotaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAddressQuota() throws Exception {
        // Initialize the database
        addressQuotaRepository.saveAndFlush(addressQuota);

        int databaseSizeBeforeDelete = addressQuotaRepository.findAll().size();

        // Delete the addressQuota
        restAddressQuotaMockMvc.perform(delete("/api/address-quotas/{id}", addressQuota.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<AddressQuota> addressQuotaList = addressQuotaRepository.findAll();
        assertThat(addressQuotaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AddressQuota.class);
        AddressQuota addressQuota1 = new AddressQuota();
        addressQuota1.setId(1L);
        AddressQuota addressQuota2 = new AddressQuota();
        addressQuota2.setId(addressQuota1.getId());
        assertThat(addressQuota1).isEqualTo(addressQuota2);
        addressQuota2.setId(2L);
        assertThat(addressQuota1).isNotEqualTo(addressQuota2);
        addressQuota1.setId(null);
        assertThat(addressQuota1).isNotEqualTo(addressQuota2);
    }
}
