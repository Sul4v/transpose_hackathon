/**
 * Crustdata API Explorer
 * Tests all available endpoints and shows sample responses
 */

const CRUSTDATA_API_KEY = process.env.CRUSTDATA_API_KEY || 'ef714fbc7f785bec083c0ba90ac2b4164bc8126b';
const BASE_URL = 'https://api.crustdata.com';

const headers = {
    'Authorization': `Token ${CRUSTDATA_API_KEY}`,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

// Helper function to make API calls
async function callAPI(endpoint, method = 'GET', body = null) {
    const url = `${BASE_URL}${endpoint}`;
    console.log(`\n${'='.repeat(70)}`);
    console.log(`📡 ${method} ${endpoint}`);
    console.log('='.repeat(70));

    try {
        const options = { method, headers };
        if (body) options.body = JSON.stringify(body);

        const response = await fetch(url, options);
        const data = await response.json();

        console.log(`Status: ${response.status} ${response.statusText}`);
        console.log('\n📦 Response:');
        console.log(JSON.stringify(data, null, 2));

        return { success: response.ok, data, status: response.status };
    } catch (error) {
        console.log(`❌ Error: ${error.message}`);
        return { success: false, error: error.message };
    }
}

async function main() {
    console.log('🚀 CRUSTDATA API EXPLORER');
    console.log('Testing all available endpoints...\n');

    // 1. User Dashboard - Check credits
    console.log('\n\n🔷 1. USER DASHBOARD - /user_dashboard/users');
    console.log('Purpose: Check your account info and remaining credits');
    await callAPI('/user/credits', 'GET');

    // 2. LinkedIn Posts - Keyword Search
    console.log('\n\n🔷 2. LINKEDIN POSTS KEYWORD SEARCH - /screener/linkedin_posts/keyword_search');
    console.log('Purpose: Search LinkedIn posts by keyword');
    await callAPI('/screener/linkedin_posts/keyword_search/', 'POST', {
        keyword: 'UAE hackathon',
        limit: 3,
        sort_by: 'date_posted',
        date_posted: 'past-week'
    });

    // 3. LinkedIn Posts - Single Post
    console.log('\n\n🔷 3. LINKEDIN POSTS - /screener/linkedin_posts');
    console.log('Purpose: Get data for a specific LinkedIn post');
    await callAPI('/screener/linkedin_posts?linkedin_post_url=https://www.linkedin.com/feed/update/urn:li:activity:7420730134661365760&limit=1', 'GET');

    // 4. LinkedIn Filter Autocomplete
    console.log('\n\n🔷 4. LINKEDIN FILTER AUTOCOMPLETE - /screener/linkedin_filter/autocomplete');
    console.log('Purpose: Get autocomplete suggestions for filter values');
    await callAPI('/screener/linkedin_filter/autocomplete', 'POST', {
        field: 'title',
        query: 'Software Engineer'
    });

    // 5. Company Enrichment
    console.log('\n\n🔷 5. COMPANY ENRICHMENT - /screener/company');
    console.log('Purpose: Get detailed company data');
    await callAPI('/screener/company?company_domain=crustdata.com', 'GET');

    // 6. Job Listings
    console.log('\n\n🔷 6. JOB LISTINGS - /data_lab/job_listings/Table/');
    console.log('Purpose: Get job listings data');
    await callAPI('/data_lab/job_listings/Table/', 'POST', {
        tickers: [],
        dataset: {
            name: 'job_listings',
            id: 'joblisting'
        },
        filters: {
            op: 'and',
            conditions: []
        },
        groups: [],
        aggregations: [],
        functions: [],
        offset: 0,
        count: 3,
        sorts: []
    });

    // 7. Person Search (Realtime)
    console.log('\n\n🔷 7. PERSON SEARCH (Realtime) - /screener/person/search');
    console.log('Purpose: Search for people based on filters');
    await callAPI('/screener/person/search', 'POST', {
        filters: [
            {
                filter_type: 'current_company_name',
                type: 'in',
                value: ['Google']
            }
        ],
        page: 1,
        limit: 3
    });

    // 8. Company Search (Realtime)
    console.log('\n\n🔷 8. COMPANY SEARCH (Realtime) - /screener/company/search');
    console.log('Purpose: Search for companies based on filters');
    await callAPI('/screener/company/search', 'POST', {
        filters: [
            {
                filter_type: 'company_location',
                type: 'in',
                value: ['United Arab Emirates']
            }
        ],
        page: 1,
        limit: 3
    });

    // 9. Web Fetch
    console.log('\n\n🔷 9. WEB FETCH - /screener/web-fetch');
    console.log('Purpose: Fetch content from a URL');
    await callAPI('/screener/web-fetch', 'POST', {
        url: 'https://crustdata.com'
    });

    // 10. Web Search
    console.log('\n\n🔷 10. WEB SEARCH - /screener/web-search');
    console.log('Purpose: Search the web for information');
    await callAPI('/screener/web-search', 'POST', {
        query: 'UAE tech startups 2024'
    });

    // 11. Company Identification
    console.log('\n\n🔷 11. COMPANY IDENTIFICATION - /screener/identify');
    console.log('Purpose: Identify a company by name or domain');
    await callAPI('/screener/identify/', 'POST', {
        query_company_website: 'hubspot.com'
    });

    // 12. Person Enrichment
    console.log('\n\n🔷 12. PERSON ENRICHMENT - /screener/person/enrich');
    console.log('Purpose: Enrich a person profile by LinkedIn URL');
    await callAPI('/screener/person/enrich?linkedin_profile_url=https://www.linkedin.com/in/hammad2', 'GET');

    // 13. Company People
    console.log('\n\n🔷 13. COMPANY PEOPLE - /screener/company/people');
    console.log('Purpose: Get people working at a specific company');
    await callAPI('/screener/company/people?company_domain=crustdata.com&limit=5', 'GET');

    console.log('\n\n' + '='.repeat(70));
    console.log('✅ API EXPLORATION COMPLETE');
    console.log('='.repeat(70));
}

main().catch(console.error);
