package com.mycompany.myapp.web.rest;
import com.mycompany.myapp.domain.AddressQuota;
import com.mycompany.myapp.repository.AddressQuotaRepository;
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
 * REST controller for managing AddressQuota.
 */
@RestController
@RequestMapping("/api")
public class AddressQuotaResource {

    private final Logger log = LoggerFactory.getLogger(AddressQuotaResource.class);

    private static final String ENTITY_NAME = "addressQuota";

    private final AddressQuotaRepository addressQuotaRepository;

    public AddressQuotaResource(AddressQuotaRepository addressQuotaRepository) {
        this.addressQuotaRepository = addressQuotaRepository;
    }

    /**
     * POST  /address-quotas : Create a new addressQuota.
     *
     * @param addressQuota the addressQuota to create
     * @return the ResponseEntity with status 201 (Created) and with body the new addressQuota, or with status 400 (Bad Request) if the addressQuota has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/address-quotas")
    public ResponseEntity<AddressQuota> createAddressQuota(@RequestBody AddressQuota addressQuota) throws URISyntaxException {
        log.debug("REST request to save AddressQuota : {}", addressQuota);
        if (addressQuota.getId() != null) {
            throw new BadRequestAlertException("A new addressQuota cannot already have an ID", ENTITY_NAME, "idexists");
        }
        AddressQuota result = addressQuotaRepository.save(addressQuota);
        return ResponseEntity.created(new URI("/api/address-quotas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /address-quotas : Updates an existing addressQuota.
     *
     * @param addressQuota the addressQuota to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated addressQuota,
     * or with status 400 (Bad Request) if the addressQuota is not valid,
     * or with status 500 (Internal Server Error) if the addressQuota couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/address-quotas")
    public ResponseEntity<AddressQuota> updateAddressQuota(@RequestBody AddressQuota addressQuota) throws URISyntaxException {
        log.debug("REST request to update AddressQuota : {}", addressQuota);
        if (addressQuota.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        AddressQuota result = addressQuotaRepository.save(addressQuota);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, addressQuota.getId().toString()))
            .body(result);
    }

    /**
     * GET  /address-quotas : get all the addressQuotas.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of addressQuotas in body
     */
    @GetMapping("/address-quotas")
    public List<AddressQuota> getAllAddressQuotas() {
        log.debug("REST request to get all AddressQuotas");
        return addressQuotaRepository.findAll();
    }

    /**
     * GET  /address-quotas/:id : get the "id" addressQuota.
     *
     * @param id the id of the addressQuota to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the addressQuota, or with status 404 (Not Found)
     */
    @GetMapping("/address-quotas/{id}")
    public ResponseEntity<AddressQuota> getAddressQuota(@PathVariable Long id) {
        log.debug("REST request to get AddressQuota : {}", id);
        Optional<AddressQuota> addressQuota = addressQuotaRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(addressQuota);
    }

    /**
     * DELETE  /address-quotas/:id : delete the "id" addressQuota.
     *
     * @param id the id of the addressQuota to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/address-quotas/{id}")
    public ResponseEntity<Void> deleteAddressQuota(@PathVariable Long id) {
        log.debug("REST request to delete AddressQuota : {}", id);
        addressQuotaRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
