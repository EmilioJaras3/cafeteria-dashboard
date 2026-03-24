package com.tienditacampus.tests;

import org.apache.hc.client5.http.classic.methods.HttpGet;
import org.apache.hc.client5.http.classic.methods.HttpPost;
import org.apache.hc.client5.http.classic.methods.HttpPut;
import org.apache.hc.client5.http.classic.methods.HttpDelete;
import org.apache.hc.client5.http.impl.classic.CloseableHttpClient;
import org.apache.hc.client5.http.impl.classic.HttpClients;
import org.apache.hc.core5.http.ClassicHttpResponse;
import org.apache.hc.core5.http.ContentType;
import org.apache.hc.core5.http.HttpEntity;
import org.apache.hc.core5.http.io.entity.EntityUtils;
import org.apache.hc.core5.http.io.entity.StringEntity;
import org.json.JSONObject;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;

public class BaseApiTest {
    protected static final String BASE_URL = "http://localhost:3001/api";
    protected static CloseableHttpClient httpClient;
    protected static String authToken;

    @BeforeAll
    public static void setUp() throws IOException {
        httpClient = HttpClients.createDefault();

        // Test connection to API
        HttpGet healthCheck = new HttpGet(BASE_URL + "/health");
        try (ClassicHttpResponse response = httpClient.execute(healthCheck)) {
            assertEquals(200, response.getCode(), "API should be running");
        }
    }

    @AfterAll
    public static void tearDown() throws IOException {
        if (httpClient != null) {
            httpClient.close();
        }
    }

    protected JSONObject post(String endpoint, JSONObject jsonData) throws IOException {
        HttpPost httpPost = new HttpPost(BASE_URL + endpoint);
        httpPost.setHeader("Content-Type", "application/json");

        if (authToken != null) {
            httpPost.setHeader("Authorization", "Bearer " + authToken);
        }

        StringEntity entity = new StringEntity(jsonData.toString(), ContentType.APPLICATION_JSON);
        httpPost.setEntity(entity);

        try (ClassicHttpResponse response = httpClient.execute(httpPost)) {
            String responseBody = EntityUtils.toString(response.getEntity());
            return new JSONObject(responseBody);
        } catch (Exception e) {
            throw new IOException("Failed to execute POST request: " + e.getMessage(), e);
        }
    }

    protected JSONObject get(String endpoint) throws IOException {
        HttpGet httpGet = new HttpGet(BASE_URL + endpoint);

        if (authToken != null) {
            httpGet.setHeader("Authorization", "Bearer " + authToken);
        }

        try (ClassicHttpResponse response = httpClient.execute(httpGet)) {
            String responseBody = EntityUtils.toString(response.getEntity());
            return new JSONObject(responseBody);
        } catch (Exception e) {
            throw new IOException("Failed to execute GET request: " + e.getMessage(), e);
        }
    }

    protected JSONObject put(String endpoint, JSONObject jsonData) throws IOException {
        HttpPut httpPut = new HttpPut(BASE_URL + endpoint);
        httpPut.setHeader("Content-Type", "application/json");

        if (authToken != null) {
            httpPut.setHeader("Authorization", "Bearer " + authToken);
        }

        StringEntity entity = new StringEntity(jsonData.toString(), ContentType.APPLICATION_JSON);
        httpPut.setEntity(entity);

        try (ClassicHttpResponse response = httpClient.execute(httpPut)) {
            String responseBody = EntityUtils.toString(response.getEntity());
            return new JSONObject(responseBody);
        } catch (Exception e) {
            throw new IOException("Failed to execute PUT request: " + e.getMessage(), e);
        }
    }

    protected void delete(String endpoint) throws IOException {
        HttpDelete httpDelete = new HttpDelete(BASE_URL + endpoint);

        if (authToken != null) {
            httpDelete.setHeader("Authorization", "Bearer " + authToken);
        }

        try (ClassicHttpResponse response = httpClient.execute(httpDelete)) {
            assertTrue(response.getCode() == 200 || response.getCode() == 204,
                      "Delete should return 200 or 204");
        } catch (Exception e) {
            throw new IOException("Failed to execute DELETE request: " + e.getMessage(), e);
        }
    }

    protected void loginAsTestUser() throws IOException {
        JSONObject loginData = new JSONObject();
        loginData.put("email", "test@example.com");
        loginData.put("password", "testpass123");

        try {
            JSONObject response = post("/auth/login", loginData);
            if (response.has("accessToken")) {
                authToken = response.getString("accessToken");
            }
        } catch (Exception e) {
            // User might not exist, try to register first
            registerTestUser();
            JSONObject response = post("/auth/login", loginData);
            authToken = response.getString("accessToken");
        }
    }

    protected void registerTestUser() throws IOException {
        JSONObject userData = new JSONObject();
        userData.put("email", "test@example.com");
        userData.put("password", "testpass123");
        userData.put("firstName", "Test");
        userData.put("lastName", "User");
        userData.put("phone", "1234567890");
        userData.put("role", "buyer");

        post("/auth/register", userData);
    }
}
