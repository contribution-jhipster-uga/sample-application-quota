package com.mycompany.myapp.web.rest;
import com.mycompany.myapp.domain.ProductQuota;
import com.mycompany.myapp.repository.ProductQuotaRepository;
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
 * REST controller for managing ProductQuota.
 */
@RestController
@RequestMapping("/api")
public class ProductQuotaResource {

    private final Logger log = LoggerFactory.getLogger(ProductQuotaResource.class);

    private static final String ENTITY_NAME = "productQuota";

    private final ProductQuotaRepository productQuotaRepository;

    public ProductQuotaResource(ProductQuotaRepository productQuotaRepository) {
        this.productQuotaRepository = productQuotaRepository;
    }

    /**
     * POST  /product-quotas : Create a new productQuota.
     *
     * @param productQuota the productQuota to create
     * @return the ResponseEntity with status 201 (Created) and with body the new productQuota, or with status 400 (Bad Request) if the productQuota has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/product-quotas")
    public ResponseEntity<ProductQuota> createProductQuota(@RequestBody ProductQuota productQuota) throws URISyntaxException {
        log.debug("REST request to save ProductQuota : {}", productQuota);
        if (productQuota.getId() != null) {
            throw new BadRequestAlertException("A new productQuota cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProductQuota result = productQuotaRepository.save(productQuota);
        return ResponseEntity.created(new URI("/api/product-quotas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /product-quotas : Updates an existing productQuota.
     *
     * @param productQuota the productQuota to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated productQuota,
     * or with status 400 (Bad Request) if the productQuota is not valid,
     * or with status 500 (Internal Server Error) if the productQuota couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/product-quotas")
    public ResponseEntity<ProductQuota> updateProductQuota(@RequestBody ProductQuota productQuota) throws URISyntaxException {
        log.debug("REST request to update ProductQuota : {}", productQuota);
        if (productQuota.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProductQuota result = productQuotaRepository.save(productQuota);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, productQuota.getId().toString()))
            .body(result);
    }

    /**
     * GET  /product-quotas : get all the productQuotas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of productQuotas in body
     */
    @GetMapping("/product-quotas")
    public List<ProductQuota> getAllProductQuotas() {
        log.debug("REST request to get all ProductQuotas");
        return productQuotaRepository.findAll();
    }

    /**
     * GET  /product-quotas/:id : get the "id" productQuota.
     *
     * @param id the id of the productQuota to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the productQuota, or with status 404 (Not Found)
     */
    @GetMapping("/product-quotas/{id}")
    public ResponseEntity<ProductQuota> getProductQuota(@PathVariable Long id) {
        log.debug("REST request to get ProductQuota : {}", id);
        Optional<ProductQuota> productQuota = productQuotaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(productQuota);
    }

    /**
     * DELETE  /product-quotas/:id : delete the "id" productQuota.
     *
     * @param id the id of the productQuota to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/product-quotas/{id}")
    public ResponseEntity<Void> deleteProductQuota(@PathVariable Long id) {
        log.debug("REST request to delete ProductQuota : {}", id);
        productQuotaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
