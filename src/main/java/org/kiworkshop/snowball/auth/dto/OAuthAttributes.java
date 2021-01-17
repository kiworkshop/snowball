package org.kiworkshop.snowball.auth.dto;

import lombok.Builder;
import lombok.Getter;
import org.kiworkshop.snowball.user.entity.Role;
import org.kiworkshop.snowball.user.entity.User;

import java.util.Map;

@Getter
public class OAuthAttributes {

    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String email;
    private String name;
    private String pictureUrl;

    @Builder
    public OAuthAttributes(Map<String, Object> attributes,
                           String nameAttributeKey, String name,
                           String email, String pictureUrl) {
        this.attributes = attributes;
        this.nameAttributeKey= nameAttributeKey;
        this.email = email;
        this.name = name;
        this.pictureUrl = pictureUrl;
    }

    public static OAuthAttributes of(String registrationId,
                                     String userNameAttributeName,
                                     Map<String, Object> attributes) {
        return ofGoogle(userNameAttributeName, attributes);
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName,
                                            Map<String, Object> attributes) {
        return OAuthAttributes.builder()
                .name((String) attributes.get("name"))
                .email((String) attributes.get("email"))
                .pictureUrl((String) attributes.get("picture"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    public User toEntity() {
        return User.builder()
                .name(name)
                .email(email)
                .pictureUrl(pictureUrl)
                .role(Role.USER)
                .build();
    }
}