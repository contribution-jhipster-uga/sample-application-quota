package com.mycompany.myapp.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.Objects;

/**
 * A CustomerQuota.
 */
@Entity
@Table(name = "customer_quota")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class CustomerQuota implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "jhi_quota")
    private Integer quota;

    @OneToOne
    @JoinColumn(unique = true)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuota() {
        return quota;
    }

    public CustomerQuota quota(Integer quota) {
        this.quota = quota;
        return this;
    }

    public void setQuota(Integer quota) {
        this.quota = quota;
    }

    public User getUser() {
        return user;
    }

    public CustomerQuota user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        CustomerQuota customerQuota = (CustomerQuota) o;
        if (customerQuota.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), customerQuota.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "CustomerQuota{" +
            "id=" + getId() +
            ", quota=" + getQuota() +
            "}";
    }
}
