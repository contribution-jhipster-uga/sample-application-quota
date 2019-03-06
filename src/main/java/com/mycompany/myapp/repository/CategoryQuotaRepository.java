package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CategoryQuota;
import org.springframework.data.jpa.repository.*;
import java.util.Optional;
import com.mycompany.myapp.domain.User;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CategoryQuota entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CategoryQuotaRepository extends JpaRepository<CategoryQuota, Long> {

	Optional<CategoryQuota> findOneByUser(User user);
}
