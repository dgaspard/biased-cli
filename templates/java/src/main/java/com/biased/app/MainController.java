package com.biased.app;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.util.HashMap;

@RestController
public class MainController {
    
    @GetMapping("/")
    public Map<String, String> index() {
        Map<String, String> response = new HashMap<>();
        response.put("message", "Welcome to {{PROJECT_NAME}}");
        response.put("problem", "{{PROJECT_PROBLEM}}");
        response.put("personas", "{{USER_PERSONAS}}");
        return response;
    }
    
    @GetMapping("/health")
    public Map<String, String> health() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "{{PROJECT_NAME}}");
        return response;
    }
}
