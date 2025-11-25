package com.biased.app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Application {
    public static void main(String[] args) {
        System.out.println("🚀 {{PROJECT_NAME}} starting...");
        System.out.println("📋 Problem: {{PROJECT_PROBLEM}}");
        System.out.println("👥 Personas: {{USER_PERSONAS}}");
        SpringApplication.run(Application.class, args);
    }
}
