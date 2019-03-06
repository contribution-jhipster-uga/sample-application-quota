package com.mycompany.myapp.web.rest;
import com.mycompany.myapp.domain.CategoryQuota;
import com.mycompany.myapp.repository.CategoryQuotaRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing CategoryQuota.
 */
@RestController
@RequestMapping("/api")
public class CategoryQuotaResource {

    private final Logger log = LoggerFactory.getLogger(CategoryQuotaResource.class);

    private static final String ENTITY_NAME = "categoryQuota";

    private final CategoryQuotaRepository categoryQuotaRepository;

    public CategoryQuotaResource(CategoryQuotaRepository categoryQuotaRepository) {
        this.categoryQuotaRepository = categoryQuotaRepository;
    }

    /**
     * POST  /category-quotas : Create a new categoryQuota.
     *
     * @param categoryQuota the categoryQuota to create
     * @return the ResponseEntity with status 201 (Created) and with body the new categoryQuota, or with status 400 (Bad Request) if the categoryQuota has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/category-quotas")
    public ResponseEntity<CategoryQuota> createCategoryQuota(@RequestBody CategoryQuota categoryQuota) throws URISyntaxException {
        log.debug("REST request to save CategoryQuota : {}", categoryQuota);
        if (categoryQuota.getId() != null) {
            throw new BadRequestAlertException("A new categoryQuota cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CategoryQuota result = categoryQuotaRepository.save(categoryQuota);
        return ResponseEntity.created(new URI("/api/category-quotas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /category-quotas : Updates an existing categoryQuota.
     *
     * @param categoryQuota the categoryQuota to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated categoryQuota,
     * or with status 400 (Bad Request) if the categoryQuota is not valid,
     * or with status 500 (Internal Server Error) if the categoryQuota couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/category-quotas")
    public ResponseEntity<CategoryQuota> updateCategoryQuota(@RequestBody CategoryQuota categoryQuota) throws URISyntaxException {
        log.debug("REST request to update CategoryQuota : {}", categoryQuota);
        if (categoryQuota.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CategoryQuota result = categoryQuotaRepository.save(categoryQuota);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, categoryQuota.getId().toString()))
            .body(result);
    }

    /**
     * GET  /category-quotas : get all the categoryQuotas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of categoryQuotas in body
     */
    @GetMapping("/category-quotas")
    public List<CategoryQuota> getAllCategoryQuotas() {
        log.debug("REST request to get all CategoryQuotas");
        return categoryQuotaRepository.findAll();
    }

    /**
     * GET  /category-quotas/:id : get the "id" categoryQuota.
     *
     * @param id the id of the categoryQuota to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the categoryQuota, or with status 404 (Not Found)
     */
    @GetMapping("/category-quotas/{id}")
    public ResponseEntity<CategoryQuota> getCategoryQuota(@PathVariable Long id) {
        log.debug("REST request to get CategoryQuota : {}", id);
        Optional<CategoryQuota> categoryQuota = categoryQuotaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(categoryQuota);
    }

    /**
     * DELETE  /category-quotas/:id : delete the "id" categoryQuota.
     *
     * @param id the id of the categoryQuota to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/category-quotas/{id}")
    public ResponseEntity<Void> deleteCategoryQuota(@PathVariable Long id) {
        log.debug("REST request to delete CategoryQuota : {}", id);
        categoryQuotaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
