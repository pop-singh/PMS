package com.courier;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main Spring Boot Application Class
 * 
 * This is the entry point of our Courier Management System backend application.
 * The @SpringBootApplication annotation is a convenience annotation that adds all of the following:
 * - @Configuration: Tags the class as a source of bean definitions for the application context
 * - @EnableAutoConfiguration: Tells Spring Boot to start adding beans based on classpath settings
 * - @ComponentScan: Tells Spring to look for other components, configurations, and services in the com/courier package
 * 
 * When this application starts, Spring Boot will:
 * 1. Scan for components in the com.courier package
 * 2. Auto-configure the application based on dependencies
 * 3. Start the embedded web server (Tomcat by default)
 * 4. Make the application available on http://localhost:8080
 */
@SpringBootApplication
public class CourierServiceApplication {

    /**
     * Main method - The entry point of the application
     * 
     * This method is called when the JAR file is executed or when running the application
     * from an IDE. It uses SpringApplication.run() to launch the application.
     * 
     * @param args Command line arguments passed to the application
     */
    public static void main(String[] args) {
        // SpringApplication.run() starts the Spring application context
        // It creates the ApplicationContext, registers the CommandLinePropertySource,
        // and refreshes the context
        SpringApplication.run(CourierServiceApplication.class, args);
    }
} 