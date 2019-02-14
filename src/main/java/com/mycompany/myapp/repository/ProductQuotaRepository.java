package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.ProductQuota;
import org.springframework.data.jpa.repository.*;
import java.util.Optional;
import com.mycompany.myapp.domain.User;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the ProductQuota entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductQuotaRepository extends JpaRepository<ProductQuota, Long> {

	Optional<ProductQuota> findOneByUser(User user);
}
