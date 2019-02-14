package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.JhipsterApp;

import com.mycompany.myapp.domain.CategoryQuota;
import com.mycompany.myapp.repository.CategoryQuotaRepository;
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
 * Test class for the CategoryQuotaResource REST controller.
 *
 * @see CategoryQuotaResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class CategoryQuotaResourceIntTest {

    private static final Integer DEFAULT_QUOTA = 1;
    private static final Integer UPDATED_QUOTA = 2;

    @Autowired
    private CategoryQuotaRepository categoryQuotaRepository;

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

    private MockMvc restCategoryQuotaMockMvc;

    private CategoryQuota categoryQuota;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CategoryQuotaResource categoryQuotaResource = new CategoryQuotaResource(categoryQuotaRepository);
        this.restCategoryQuotaMockMvc = MockMvcBuilders.standaloneSetup(categoryQuotaResource)
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
    public static CategoryQuota createEntity(EntityManager em) {
        CategoryQuota categoryQuota = new CategoryQuota()
            .quota(DEFAULT_QUOTA);
        return categoryQuota;
    }

    @Before
    public void initTest() {
        categoryQuota = createEntity(em);
    }

    @Test
    @Transactional
    public void createCategoryQuota() throws Exception {
        int databaseSizeBeforeCreate = categoryQuotaRepository.findAll().size();

        // Create the CategoryQuota
        restCategoryQuotaMockMvc.perform(post("/api/category-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoryQuota)))
            .andExpect(status().isCreated());

        // Validate the CategoryQuota in the database
        List<CategoryQuota> categoryQuotaList = categoryQuotaRepository.findAll();
        assertThat(categoryQuotaList).hasSize(databaseSizeBeforeCreate + 1);
        CategoryQuota testCategoryQuota = categoryQuotaList.get(categoryQuotaList.size() - 1);
        assertThat(testCategoryQuota.getQuota()).isEqualTo(DEFAULT_QUOTA);
    }

    @Test
    @Transactional
    public void createCategoryQuotaWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = categoryQuotaRepository.findAll().size();

        // Create the CategoryQuota with an existing ID
        categoryQuota.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCategoryQuotaMockMvc.perform(post("/api/category-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoryQuota)))
            .andExpect(status().isBadRequest());

        // Validate the CategoryQuota in the database
        List<CategoryQuota> categoryQuotaList = categoryQuotaRepository.findAll();
        assertThat(categoryQuotaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCategoryQuotas() throws Exception {
        // Initialize the database
        categoryQuotaRepository.saveAndFlush(categoryQuota);

        // Get all the categoryQuotaList
        restCategoryQuotaMockMvc.perform(get("/api/category-quotas?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categoryQuota.getId().intValue())))
            .andExpect(jsonPath("$.[*].quota").value(hasItem(DEFAULT_QUOTA)));
    }
    
    @Test
    @Transactional
    public void getCategoryQuota() throws Exception {
        // Initialize the database
        categoryQuotaRepository.saveAndFlush(categoryQuota);

        // Get the categoryQuota
        restCategoryQuotaMockMvc.perform(get("/api/category-quotas/{id}", categoryQuota.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(categoryQuota.getId().intValue()))
            .andExpect(jsonPath("$.quota").value(DEFAULT_QUOTA));
    }

    @Test
    @Transactional
    public void getNonExistingCategoryQuota() throws Exception {
        // Get the categoryQuota
        restCategoryQuotaMockMvc.perform(get("/api/category-quotas/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCategoryQuota() throws Exception {
        // Initialize the database
        categoryQuotaRepository.saveAndFlush(categoryQuota);

        int databaseSizeBeforeUpdate = categoryQuotaRepository.findAll().size();

        // Update the categoryQuota
        CategoryQuota updatedCategoryQuota = categoryQuotaRepository.findById(categoryQuota.getId()).get();
        // Disconnect from session so that the updates on updatedCategoryQuota are not directly saved in db
        em.detach(updatedCategoryQuota);
        updatedCategoryQuota
            .quota(UPDATED_QUOTA);

        restCategoryQuotaMockMvc.perform(put("/api/category-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCategoryQuota)))
            .andExpect(status().isOk());

        // Validate the CategoryQuota in the database
        List<CategoryQuota> categoryQuotaList = categoryQuotaRepository.findAll();
        assertThat(categoryQuotaList).hasSize(databaseSizeBeforeUpdate);
        CategoryQuota testCategoryQuota = categoryQuotaList.get(categoryQuotaList.size() - 1);
        assertThat(testCategoryQuota.getQuota()).isEqualTo(UPDATED_QUOTA);
    }

    @Test
    @Transactional
    public void updateNonExistingCategoryQuota() throws Exception {
        int databaseSizeBeforeUpdate = categoryQuotaRepository.findAll().size();

        // Create the CategoryQuota

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCategoryQuotaMockMvc.perform(put("/api/category-quotas")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoryQuota)))
            .andExpect(status().isBadRequest());

        // Validate the CategoryQuota in the database
        List<CategoryQuota> categoryQuotaList = categoryQuotaRepository.findAll();
        assertThat(categoryQuotaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCategoryQuota() throws Exception {
        // Initialize the database
        categoryQuotaRepository.saveAndFlush(categoryQuota);

        int databaseSizeBeforeDelete = categoryQuotaRepository.findAll().size();

        // Delete the categoryQuota
        restCategoryQuotaMockMvc.perform(delete("/api/category-quotas/{id}", categoryQuota.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CategoryQuota> categoryQuotaList = categoryQuotaRepository.findAll();
        assertThat(categoryQuotaList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CategoryQuota.class);
        CategoryQuota categoryQuota1 = new CategoryQuota();
        categoryQuota1.setId(1L);
        CategoryQuota categoryQuota2 = new CategoryQuota();
        categoryQuota2.setId(categoryQuota1.getId());
        assertThat(categoryQuota1).isEqualTo(categoryQuota2);
        categoryQuota2.setId(2L);
        assertThat(categoryQuota1).isNotEqualTo(categoryQuota2);
        categoryQuota1.setId(null);
        assertThat(categoryQuota1).isNotEqualTo(categoryQuota2);
    }
}
