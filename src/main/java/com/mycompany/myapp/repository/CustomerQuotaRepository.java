package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CustomerQuota;
import org.springframework.data.jpa.repository.*;
import java.util.Optional;
import com.mycompany.myapp.domain.User;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CustomerQuota entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CustomerQuotaRepository extends JpaRepository<CustomerQuota, Long> {

	Optional<CustomerQuota> findOneByUser(User user);
}
