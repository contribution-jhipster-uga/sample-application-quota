package com.mycompany.myapp.web.rest;
import com.mycompany.myapp.domain.CustomerQuota;
import com.mycompany.myapp.repository.CustomerQuotaRepository;
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
 * REST controller for managing CustomerQuota.
 */
@RestController
@RequestMapping("/api")
public class CustomerQuotaResource {

    private final Logger log = LoggerFactory.getLogger(CustomerQuotaResource.class);

    private static final String ENTITY_NAME = "customerQuota";

    private final CustomerQuotaRepository customerQuotaRepository;

    public CustomerQuotaResource(CustomerQuotaRepository customerQuotaRepository) {
        this.customerQuotaRepository = customerQuotaRepository;
    }

    /**
     * POST  /customer-quotas : Create a new customerQuota.
     *
     * @param customerQuota the customerQuota to create
     * @return the ResponseEntity with status 201 (Created) and with body the new customerQuota, or with status 400 (Bad Request) if the customerQuota has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/customer-quotas")
    public ResponseEntity<CustomerQuota> createCustomerQuota(@RequestBody CustomerQuota customerQuota) throws URISyntaxException {
        log.debug("REST request to save CustomerQuota : {}", customerQuota);
        if (customerQuota.getId() != null) {
            throw new BadRequestAlertException("A new customerQuota cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CustomerQuota result = customerQuotaRepository.save(customerQuota);
        return ResponseEntity.created(new URI("/api/customer-quotas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /customer-quotas : Updates an existing customerQuota.
     *
     * @param customerQuota the customerQuota to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated customerQuota,
     * or with status 400 (Bad Request) if the customerQuota is not valid,
     * or with status 500 (Internal Server Error) if the customerQuota couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/customer-quotas")
    public ResponseEntity<CustomerQuota> updateCustomerQuota(@RequestBody CustomerQuota customerQuota) throws URISyntaxException {
        log.debug("REST request to update CustomerQuota : {}", customerQuota);
        if (customerQuota.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        CustomerQuota result = customerQuotaRepository.save(customerQuota);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, customerQuota.getId().toString()))
            .body(result);
    }

    /**
     * GET  /customer-quotas : get all the customerQuotas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of customerQuotas in body
     */
    @GetMapping("/customer-quotas")
    public List<CustomerQuota> getAllCustomerQuotas() {
        log.debug("REST request to get all CustomerQuotas");
        return customerQuotaRepository.findAll();
    }

    /**
     * GET  /customer-quotas/:id : get the "id" customerQuota.
     *
     * @param id the id of the customerQuota to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the customerQuota, or with status 404 (Not Found)
     */
    @GetMapping("/customer-quotas/{id}")
    public ResponseEntity<CustomerQuota> getCustomerQuota(@PathVariable Long id) {
        log.debug("REST request to get CustomerQuota : {}", id);
        Optional<CustomerQuota> customerQuota = customerQuotaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(customerQuota);
    }

    /**
     * DELETE  /customer-quotas/:id : delete the "id" customerQuota.
     *
     * @param id the id of the customerQuota to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/customer-quotas/{id}")
    public ResponseEntity<Void> deleteCustomerQuota(@PathVariable Long id) {
        log.debug("REST request to delete CustomerQuota : {}", id);
        customerQuotaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
