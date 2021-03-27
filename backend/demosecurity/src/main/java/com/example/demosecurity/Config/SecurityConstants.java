package com.example.demosecurity.Config;

public class SecurityConstants {
    public static final String SIGN_UP_URLS = "/secure/auth/**";
    public static final String H2_URL = "h2-console/**";
    public static final String SECRET ="SecretKeyToGenJWTs";
    public static final String TOKEN_PREFIX= "Bearer ";
    public static final String HEADER_STRING = "Authorization";
    public static final long EXPIRATION_TIME = 24*60*60*1000; //24*3600 giay
}
