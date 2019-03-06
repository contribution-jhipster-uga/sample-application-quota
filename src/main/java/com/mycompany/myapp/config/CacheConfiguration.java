package com.mycompany.myapp.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import io.github.jhipster.config.jcache.BeanClassLoaderAwareJCacheRegionFactory;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        BeanClassLoaderAwareJCacheRegionFactory.setBeanClassLoader(this.getClass().getClassLoader());
        JHipsterProperties.Cache.Ehcache ehcache =
            jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            cm.createCache(com.mycompany.myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE, jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE, jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.User.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Authority.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.User.class.getName() + ".authorities", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Category.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Category.class.getName() + ".products", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Product.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Product.class.getName() + ".categories", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Customer.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Customer.class.getName() + ".addresses", jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.Address.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.EntityAuditEvent.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.CategoryQuota.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.ProductQuota.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.CustomerQuota.class.getName(), jcacheConfiguration);
            cm.createCache(com.mycompany.myapp.domain.AddressQuota.class.getName(), jcacheConfiguration);
            // jhipster-needle-ehcache-add-entry
        };
    }
}
