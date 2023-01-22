package com.ivank.bookup.model.enums;

public enum Role {
    ADMIN("ADMIN"),
    USER("USER");

    final String roleName;

    Role(String roleName){
        this.roleName = roleName;
    }
}
