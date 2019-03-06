package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.AddressQuota;
import org.springframework.data.jpa.repository.*;
import java.util.Optional;
import com.mycompany.myapp.domain.User;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the AddressQuota entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AddressQuotaRepository extends JpaRepository<AddressQuota, Long> {

	Optional<AddressQuota> findOneByUser(User user);
}
