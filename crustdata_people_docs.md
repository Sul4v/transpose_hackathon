# People Enrichment API

### [ 🚀 Try Now ](/api#tag/people-apis/GET/screener/person/enrich)

This API allows you to retrieve enriched data for one or more LinkedIn profiles in a single request.

## Endpoint

```
GET /screener/person/enrich
```

## Data Dictionary

[People Enrichment API Data Dictionary](/docs/2024-11-01/dictionary/people-enrichment)

## Request Parameters

| Parameter | Type | Required | Default | Description | Example|
|-----------|------|-------|---------|-------------------| -----|
| `linkedin_profile_url` | string | Yes | — | Comma-separated list of LinkedIn profile URLs (25 max limit) of the person to enrich | `https://www.linkedin.com/in/dvdhsu/`,<br></br>`https://www.linkedin.com/in/jonnilundy/` |
| `enrich_realtime` | boolean | No | `false` | Whether to enrich the profile in real-time | `true` |
| `business_email` | string | No | — | Business email of the person to enrich | `abhilash@crustdata.com` |
| `fields` | string | No | - | Specify the fields to include in the response | `all_degrees,education_background` |
| `preview` | boolean | No | `false` | [**Access controlled**] <br/>Provides basic profile details lookup | `true` |

<details id="mapping-multiple-profiles">
<summary><strong>Mapping Multiple LinkedIn URLs to Response Objects</strong></summary>

When providing multiple LinkedIn URLs, each response object includes a **`query_linkedin_profile_urn_or_slug`** field containing the profile slug (the part after `/in/` in the URL) to identify which input URL it corresponds to.

**Example:** Request `linkedin_profile_url=https://www.linkedin.com/in/siqic,https://www.linkedin.com/in/neelesh-soni` returns:
```json
[
  {"name": "Siqi Chen", "query_linkedin_profile_urn_or_slug": ["siqic"]},
  {"name": "Neelesh Soni", "query_linkedin_profile_urn_or_slug": ["neelesh-soni"]}
]
```

</details>

#### Key Features
- Latency
    - **Database Search:** Less than **10 seconds** per profile.
    - **Real-Time Search:** May take longer due to fetching data from the web.
    
- Limits
    
    - **Profiles/Emails per Request:** Up to **25**.
    - **Exceeding Limits:** Requests exceeding this limit will be rejected with an error message.
- Constraints
    - **Valid Input:** Ensure all LinkedIn URLs and email addresses are correctly formatted.
        - Invalid inputs result in validation errors.
    - **Mutually Exclusive Parameters:** Do not include both linkedin_profile_url and business_email in the same request.
    - **Independent Processing:** Each profile or email is processed independently.
        - Found entries are returned immediately
        - Not found entries trigger the enrichment process (if enrich_realtime=False)

:::info
##### Business Email Enrichment 
    
    - **Discovery:** Discover business email addresses of professionals based on their LinkedIn profiles.
    - **Implementation:** To enable, include `business_email` in the `fields` parameter:
      ```
      GET /screener/person/enrich?linkedin_profile_url=https://www.linkedin.com/in/example&fields=business_email
      ```
:::

## Credit Usage
- **Database Enrichment:**
        - **3 credits** per LinkedIn profile or email.
- **Real-Time Enrichment (enrich_realtime=True):**
    - **5 credits** per LinkedIn profile or email.
- **Email Enrichment:**
    - **2 additional credits** when requesting business email
- **Preview Mode:**
    - **0 credits** when `preview=true` is used
- **No Results, No Charges**: You are never charged credits when our APIs return no results. Credits are only deducted when data is successfully returned from your API requests.

## Example Requests

<details id="1-get-all-fields-example">
<summary>1. Get all fields example</summary>

### 1. Get all fields example
- Usecase: Retrieve comprehensive profile data including all available fields for a single LinkedIn profile
    
```bash
curl --location 'https://api.crustdata.com/screener/person/enrich?fields=linkedin_profile_url,linkedin_flagship_url,name,location,email,title,last_updated,headline,summary,num_of_connections,skills,profile_picture_url,profile_picture_permalink,twitter_handle,languages,all_employers,past_employers,current_employers,education_background,all_employers_company_id,all_titles,all_schools,all_degrees&linkedin_profile_url=https://www.linkedin.com/in/manmohitgrewal/' \
--header 'Authorization: Token $auth' \
--header 'Accept: application/json, text/plain, */*' \
--header 'Content-Type: application/json'
```
</details>

<details id="2-real-time-enrichment">
<summary>2. Real-time enrichment</summary>

### 2. Real-time enrichment 
- Usecase: Ideal for users who wants to enrich a profile in realtime from LinkedIn
    
```bash
curl -X GET "https://api.crustdata.com/screener/person/enrich?linkedin_profile_url=https://www.linkedin.com/in/abhilashchowdhary&enrich_realtime=true" \
-H "Authorization: Token auth_token" \
-H "Accept: application/json, text/plain, */*" \
-H "Content-Type: application/json"
```
</details>

<details id="3-request-for-business-email-and-all-default-fields">
<summary>3. Request with business email enrichment</summary>

### 3. Request for business email and all default fields
:::info
1. Only email enrichment
    - If you only request for `fields=business_email`, the endpoint will return just the email—no default profile fields (name, location, LinkedIn URL, headline, etc.).
    - This keeps the call cheap: 2 credits for email enrichment.
2. Email enrichment with profile enrichment
    - If you want to get the profile details along with business email you can add them to fields param in the request as shown in this example.
    - Cost: 2 credits for the email + 3 credits for profile enrichment (5 if realtime=true).
:::    

```bash
curl -X GET "https://api.crustdata.com/screener/person/enrich?linkedin_profile_url=https://www.linkedin.com/in/sasikumarm00&enrich_realtime=true&fields=business_email,linkedin_profile_url,linkedin_flagship_url,name,location,email,title,last_updated,headline,summary,num_of_connections,skills,profile_picture_url,twitter_handle,languages,linkedin_joined_date,all_employers,past_employers,current_employers,education_background,all_employers_company_id,all_titles,all_schools,all_degrees" \
-H "Authorization: Token auth_token" \
-H "Accept: application/json, text/plain, */*" \
-H "Content-Type: application/json"
```
</details>

<details id="4-request-with-all-default-fields-and-education-background-activities-and-societies">
<summary>4. Request with activities and societies</summary>

### 4. Request with all default fields AND `education_background.activities_and_societies`
        
```bash
curl -X GET "https://api.crustdata.com/screener/person/enrich?linkedin_profile_url=https://www.linkedin.com/in/sasikumarm00&enrich_realtime=true&fields=education_background.activities_and_societies,linkedin_profile_url,linkedin_flagship_url,name,location,email,title,last_updated,headline,summary,num_of_connections,skills,profile_picture_url,twitter_handle,languages,all_employers,past_employers,current_employers,education_background.degree_name,education_background.end_date,education_background.field_of_study,education_background.institute_linkedin_id,education_background.institute_linkedin_url,education_background.institute_logo_url,education_background.institute_name,education_background.start_date,all_employers_company_id,all_titles,all_schools,all_degrees" \
-H "Authorization: Token auth_token" \
-H "Accept: application/json, text/plain, */*" \
-H "Content-Type: application/json"
```
</details>

<details id="5-request-with-all-default-fields-and-certifications-honors-and-linkedin-open-to-cards">
<summary>5. Request with certifications and honors</summary>

### 5. Request with all default fields AND `certifications`, `honors`  and `linkedin_open_to_cards`
:::warning
  `certifications` , `honors`  and `linkedin_open_to_cards`  fields are not available by default. To gain access chat with [Abhilash](mailto:abhilash@crustdata.com) or [Chris](mailto:chris@crustdata.com) on your dedicated Crustdata's slack channel.
:::

```bash
curl -X GET "https://api.crustdata.com/screener/person/enrich?linkedin_profile_url=https://www.linkedin.com/in/sasikumarm00&enrich_realtime=true&fields=linkedin_profile_url,linkedin_flagship_url,name,location,email,title,last_updated,headline,summary,num_of_connections,skills,profile_picture_url,twitter_handle,languages,all_employers,past_employers,current_employers,education_background.degree_name,education_background.end_date,education_background.field_of_study,education_background.institute_linkedin_id,education_background.institute_linkedin_url,education_background.institute_logo_url,education_background.institute_name,education_background.start_date,all_employers_company_id,all_titles,all_schools,all_degrees,linkedin_open_to_cards,certifications,honors" \
-H "Authorization: Token auth_token" \
-H "Accept: application/json, text/plain, */*" \
-H "Content-Type: application/json"
```
</details>

<details id="6-request-with-all-default-fields-and-joined-date-and-verifications">
<summary>6. Request with joined date and verifications</summary>

### 6. Request with all default fields AND `joined_date` and `verifications`
:::warning
  `joined_date` and `verifications` fields are not available by default. To gain access chat with [Abhilash](mailto:abhilash@crustdata.com) or [Chris](mailto:chris@crustdata.com) on your dedicated Crustdata's slack channel.
:::
```bash
curl -X GET "https://api.crustdata.com/screener/person/enrich?force_fetch=True&linkedin_profile_url=https://www.linkedin.com/in/sasikumarm00&enrich_realtime=true&fields=linkedin_profile_url,linkedin_flagship_url,name,location,email,title,last_updated,headline,summary,num_of_connections,skills,profile_picture_url,twitter_handle,languages,all_employers,past_employers,current_employers,education_background.degree_name,education_background.end_date,education_background.field_of_study,education_background.institute_linkedin_id,education_background.institute_linkedin_url,education_background.institute_logo_url,education_background.institute_name,education_background.start_date,all_employers_company_id,all_titles,all_schools,all_degrees,linkedin_joined_date,linkedin_verifications" \
-H "Authorization: Token auth_token" \
-H "Accept: application/json, text/plain, */*" \
-H "Content-Type: application/json"
```
</details>

<details id="7-reverse-lookup-using-business-email">
<summary>7. Reverse lookup using business email</summary>

### 7. Reverse lookup using business email
        
```bash
curl -X GET "https://api.crustdata.com/screener/person/enrich?business_email=zoe.perret@initialized.com&enrich_realtime=true" \
-H "Authorization: Token auth_token" \
-H "Accept: application/json, text/plain, */*" \
-H "Content-Type: application/json"
```
</details>

<details id="8-profile-preview">
<summary>8. Preview profile</summary>

### 8. Preview profile
:::info
Access to this feature is controlled - contact [Abhilash](mailto:abhilash@crustdata.co) or [Chris](mailto:chris@crustdata.co) to enable it for your account.
:::

```bash
curl -X GET "https://api.crustdata.com/screener/person/enrich?linkedin_profile_url=https://www.linkedin.com/in/dvdhsu&preview=true" \
-H "Authorization: Token auth_token" \
-H "Accept: application/json, text/plain, */*" \
-H "Content-Type: application/json"
```
</details>

## Understanding the Score for Reverse Email Lookup {#score-explanation}

<details>
<summary>Click to view details on score calculation and interpretation</summary>

When you perform a reverse lookup using a `business_email`, the API attempts to find the corresponding professional profile. This is typically done using a request like the following:

```bash
cURL -X GET "https://api.crustdata.com/screener/person/enrich?business_email=zoe.perret@initialized.com&enrich_realtime=true" \
-H "Authorization: Token auth_token" \
-H "Accept: application/json, text/plain, */*" \
-H "Content-Type: application/json"
```

If a potential match is found, the response will include a `score` field, indicating the confidence level of the match based on name similarity.

Here's a simplified example of what the response might look like:

```json
[
  {
    "linkedin_profile_url": "https://www.linkedin.com/in/...",
    "name": "Zoe Perret",
    "location": "New York, New York, United States",
    "title": "Partner",
    "last_updated": "2025-02-11T12:27:08.315174+00:00",
    "headline": "Partner at Initialized Capital",
    // ... other fields ...
    "current_employers": [
        {
            "employer_name": "Initialized Capital",
            // ... employer details ...
            "employee_title": "Partner"
        }
        // ... other employers ...
    ],
    "score": 0.9 // <-- The enrichment score
  }
]
```

The score you receive primarily indicates how well the name on a found profile matches the structure of the input email's handle (the part before the '@'). It's a ranking signal based on name structure, not a direct measure of accuracy.

<h3>How it Works (Simplified):</h3>
1. **Parse & Identify**: We take the input email (e.g., `j.smith@example.com`), separate the handle (`j.smith`) and domain (`example.com`), and identify the likely company associated with the domain from our database.
2. **Search**: We search our database and the web for professional profiles associated with that company whose names might correspond structurally to the email handle (`j.smith`).
3. **Score Matches**: For each potential profile found, we compare the profile's actual name (e.g., "Jane Smith", "John Smith") against the email handle (`j.smith`) using common patterns and name similarity logic. The result of this comparison is the score.

<h3>Interpreting the Score:</h3>
The score reflects the structural similarity between the email handle and the name on the profile we found.
*   **High Score (0.9 - 1.0)**: Suggests a strong, common pattern match based on predefined rules.
    *   _Example 1_: Email `jane.smith@company.com` matching a profile named "Jane Smith" typically gets a score like 0.95 (reflecting the `{first}{last}` pattern).
    *   _Example 2_: Email `jsmith@company.com` matching "Jane Smith" typically gets a score like 0.75 (reflecting the `{f}{last}` pattern).
    *   _Example 3_: Email `jane@company.com` matching "Jane Smith" typically gets 0.9 if the handle is just `jane`, but might get 0.5 if the handle were `jane.marketing` (reflecting a single name pattern).
*   **Lower Score (0.5 - 0.89)**: Often indicates a match based on general name similarity calculated by internal logic, rather than a perfect pattern match.
    *   _Example 1_: Email `janes@company.com` matching "Jane Smith" might score around 0.75 (reflecting a `{first}{l}` pattern match).
    *   _Example 2_: Email `j.smith@company.com` matching "Jane Smith" might score 0.708 based on similarity logic (`j` vs `jane`, `smith` vs `smith`).
    *   _Example 3_: Email `jsmi@company.com` matching "Jane Smith" would likely score lower, calculated based on how well `jsmi` partially matches parts of "Jane Smith".

<h3>Key Takeaway:</h3> 
Use the score to gauge how well the email structurally resembles the name found. A high score means the structure fits well with common email naming conventions for that person's name.

<h3>Recommendation:</h3> 
Always verify the person's identity using other details provided in the API response, like title, `current_employers`, and location, regardless of the score.

</details>

## Example Responses

<details id="1-response-for-only-email-enrichment">
<summary>1. Response for only email enrichment</summary>

### Response when `fields=business_email` is passed in the request
```
[
    {
        "business_email": [
            "chris@crustdata.com"
        ],
        "current_employers": [
            {
                "employer_name": "Crustdata",
                "employer_linkedin_id": "33926293",
                "employer_company_website_domain": [
                    "crustdata.com"
                ],
                "business_emails": {
                    "chris@crustdata.com": {
                        "verification_status": "verified",
                        "last_validated_at": "2025-05-18"
                    }
                }
            }
        ],
        "past_employers": [
            {
                "employer_name": "PrivCo",
                "employer_linkedin_id": "28615661",
                "employer_company_website_domain": [
                    "privco.com"
                ],
                "business_emails": {
                    "chris@privco.com": {
                        "verification_status": "",
                        "last_validated_at": ""
                    }
            }
            ],
        "enriched_realtime": false,
        "query_linkedin_profile_urn_or_slug": [
            "chris-pisarski"
        ]
    }
]
```
</details>

<details id="2-response-when-profiles-are-in-database">
<summary>2. Response when profiles are in database</summary>

### Response when LinkedIn profiles are present in Crustdata's database
- Response will include the enriched data for each profile. [View example response](/examples/people-enrichment/database-response.json)
</details>

<details id="3-response-when-profiles-are-not-found">
<summary>3. Response when profiles are not found</summary>

### Response when one or more LinkedIn profiles are not present in Crustdata's database
- An error message will be returned for each profile not found, along with instructions to query again after 60 minutes. [View example response](/examples/people-enrichment/not-found-response.json)
</details>

<details id="4-response-with-all-fields">
<summary>4. Response with all fields</summary>

### Response with all possible fields
[View example response with all possible fields](/examples/people-enrichment/all-fields-response.json)
</details>

<details id="5-response-with-preview">
<summary>4. Response with `preview=true`</summary>

### Response with `preview=true`
[View example response with all possible fields](/examples/people-enrichment/person-preview.json)
</details>

### Single Profile Requests
| `enrich_realtime` | `force_fetch` | Http Code  | Error Code |API message (example)                                                                            | What it means                                                                          |
| ----------------- | ------------- | ------- | ------------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------- |
| `false`           | `false`       | **200** | - | *Profile JSON*                                                                                   | Profile returned successfully.                                                         |
| `true`            | `false`       | **200** | - | *Profile JSON*                                                                                   | Served from latest cache if present; otherwise fetched live from LinkedIn.             |
| `true`            | `true`        | **200** | - | *Profile JSON*                                                                                   | Always hits LinkedIn in real-time, ignoring cache.                                     |
| `true`            | `true`        | **404** | `PE01` | “No data found for the LinkedIn profile: \<people\_identifier>. This LinkedIn profile is not available”                                | LinkedIn profile does not exist (unavailable)                                              |
| `true`           | `true`       | **500** | `PE02` | “No data found for the LinkedIn profile: \<people\_identifier>. Internal system error while processing profile. Please try again later.”          | Profile could not be enriched due to internal failure.                                                        |
| `false`           | `false`       | **404** | `PE03` | “No data found for the LinkedIn profile: \<people\_identifier>. Data will be enriched shortly.” | Not in DB yet. Queued for enrichment. Retry later or call with `enrich_realtime=true`. |
| `false`           | `false`       | **400** | - | “Field 'linkedin\_profile\_url': Invalid LinkedIn URL format: \<linkedin\_profile\_id>”          | Malformed LinkedIn profile URL.                                                        |

### Multiple Profile Requests (Batch)
| `enrich_realtime` | `force_fetch` | Status  | API message (example)                                                                                              | What it means                                                                                    |
| ----------------- | ------------- | ------- | ------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `false`           | `false`       | **200** | *Profiles JSON*                                                                                                    | All profiles enriched successfully.                                                              |
| `false`           | `false`       | **200** | *Profiles JSON* + “No data found for the LinkedIn profile: \<people\_identifier>. Data will be enriched shortly.” | Some profiles enriched; the rest queued. Retry missing ones later or use `enrich_realtime=true`. |
| `false`           | `false`       | **200** | *Profiles JSON* + “No data found for the LinkedIn profile: \<people\_identifier>.”                                | Some profiles enriched; others don’t exist.                                                      |
| `false`           | `false`       | **400** | “Field 'linkedin\_profile\_url': Invalid LinkedIn URL format: \<linkedin\_profile\_id>”                            | At least one LinkedIn URL is malformed — entire batch rejected.                                  |

### Common Validation Errors
| Status  | API message                                                           | What it means                                                  |
| ------- | --------------------------------------------------------------------- | -------------------------------------------------------------- |
| **400** | “`force_fetch` can only be used with `enrich_realtime`.”              | `force_fetch` cannot be passed without `enrich_realtime=true`. |
| **400** | “You must provide either a LinkedIn profile URL or a business email.” | Both `linkedin_profile` and `business_email` are missing.      |
| **400** | “You can only enrich up to 25 LinkedIn profiles at a time.”           | More than 25 identifiers in a single request.                  |

### Error Codes

| Error Code | Description | Message |
|-------------|-------------|--------------|
| `PE01` | Profile Unavailable | This LinkedIn profile is not available. |
| `PE02` | Internal System Error | Internal system error while processing profile. Please try again later. |
| `PE03` | Profile Not Found in Database | Data will be enriched shortly. |
| `PE04` | Profile Parsing Error | Unable to process LinkedIn profile data |

