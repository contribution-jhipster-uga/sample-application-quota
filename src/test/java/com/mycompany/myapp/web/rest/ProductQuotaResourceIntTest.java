package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.ProductQuota;
import com.mycompany.myapp.repository.ProductQuotaRepository;
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
 * Test class for the ProductQuotaResource REST controller.
 *
 * @see ProductQuotaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class ProductQuotaResourceIntTest {

    private static final Integer DEFAULT_QUOTA = 1;
    private static final Integer UPDATED_QUOTA = 2;

    @Autowired
    private ProductQuotaRepository productQuotaRepository;

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

    private MockMvc restProductQuotaMockMvc;

    private ProductQuota productQuota;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ProductQuotaResource productQuotaResource = new ProductQuotaResource(productQuotaRepository);
        this.restProductQuotaMockMvc = MockMvcBuilders.standaloneSetup(productQuotaResource)
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
    public static ProductQuota createEntity(EntityManager em) {
        ProductQuota productQuota = new ProductQuota()
            .quota(DEFAULT_QUOTA);
        return productQuota;
    }

    @Before
    public void initTest() {
        productQuota = createEntity(em);
    }

    @Test
    @Transactional
    public void createProductQuota() throws Exception {
        int databaseSizeBeforeCreate = productQuotaRepository.findAll().size();

        // Create the ProductQuota
        restProductQuotaMockMvc.perform(post("/api/product-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productQuota)))
            .andExpect(status().isCreated());

        // Validate the ProductQuota in the database
        List<ProductQuota> productQuotaList = productQuotaRepository.findAll();
        assertThat(productQuotaList).hasSize(databaseSizeBeforeCreate + 1);
        ProductQuota testProductQuota = productQuotaList.get(productQuotaList.size() - 1);
        assertThat(testProductQuota.getQuota()).isEqualTo(DEFAULT_QUOTA);
    }

    @Test
    @Transactional
    public void createProductQuotaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = productQuotaRepository.findAll().size();

        // Create the ProductQuota with an existing ID
        productQuota.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProductQuotaMockMvc.perform(post("/api/product-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productQuota)))
            .andExpect(status().isBadRequest());

        // Validate the ProductQuota in the database
        List<ProductQuota> productQuotaList = productQuotaRepository.findAll();
        assertThat(productQuotaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllProductQuotas() throws Exception {
        // Initialize the database
        productQuotaRepository.saveAndFlush(productQuota);

        // Get all the productQuotaList
        restProductQuotaMockMvc.perform(get("/api/product-quotas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(productQuota.getId().intValue())))
            .andExpect(jsonPath("$.[*].quota").value(hasItem(DEFAULT_QUOTA)));
    }
    
    @Test
    @Transactional
    public void getProductQuota() throws Exception {
        // Initialize the database
        productQuotaRepository.saveAndFlush(productQuota);

        // Get the productQuota
        restProductQuotaMockMvc.perform(get("/api/product-quotas/{id}", productQuota.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(productQuota.getId().intValue()))
            .andExpect(jsonPath("$.quota").value(DEFAULT_QUOTA));
    }

    @Test
    @Transactional
    public void getNonExistingProductQuota() throws Exception {
        // Get the productQuota
        restProductQuotaMockMvc.perform(get("/api/product-quotas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProductQuota() throws Exception {
        // Initialize the database
        productQuotaRepository.saveAndFlush(productQuota);

        int databaseSizeBeforeUpdate = productQuotaRepository.findAll().size();

        // Update the productQuota
        ProductQuota updatedProductQuota = productQuotaRepository.findById(productQuota.getId()).get();
        // Disconnect from session so that the updates on updatedProductQuota are not directly saved in db
        em.detach(updatedProductQuota);
        updatedProductQuota
            .quota(UPDATED_QUOTA);

        restProductQuotaMockMvc.perform(put("/api/product-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedProductQuota)))
            .andExpect(status().isOk());

        // Validate the ProductQuota in the database
        List<ProductQuota> productQuotaList = productQuotaRepository.findAll();
        assertThat(productQuotaList).hasSize(databaseSizeBeforeUpdate);
        ProductQuota testProductQuota = productQuotaList.get(productQuotaList.size() - 1);
        assertThat(testProductQuota.getQuota()).isEqualTo(UPDATED_QUOTA);
    }

    @Test
    @Transactional
    public void updateNonExistingProductQuota() throws Exception {
        int databaseSizeBeforeUpdate = productQuotaRepository.findAll().size();

        // Create the ProductQuota

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProductQuotaMockMvc.perform(put("/api/product-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(productQuota)))
            .andExpect(status().isBadRequest());

        // Validate the ProductQuota in the database
        List<ProductQuota> productQuotaList = productQuotaRepository.findAll();
        assertThat(productQuotaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProductQuota() throws Exception {
        // Initialize the database
        productQuotaRepository.saveAndFlush(productQuota);

        int databaseSizeBeforeDelete = productQuotaRepository.findAll().size();

        // Delete the productQuota
        restProductQuotaMockMvc.perform(delete("/api/product-quotas/{id}", productQuota.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ProductQuota> productQuotaList = productQuotaRepository.findAll();
        assertThat(productQuotaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProductQuota.class);
        ProductQuota productQuota1 = new ProductQuota();
        productQuota1.setId(1L);
        ProductQuota productQuota2 = new ProductQuota();
        productQuota2.setId(productQuota1.getId());
        assertThat(productQuota1).isEqualTo(productQuota2);
        productQuota2.setId(2L);
        assertThat(productQuota1).isNotEqualTo(productQuota2);
        productQuota1.setId(null);
        assertThat(productQuota1).isNotEqualTo(productQuota2);
    }
}
