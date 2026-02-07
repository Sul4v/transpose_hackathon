/**
 * Fetch LinkedIn Post Data using Crustdata API
 * 
 * IMPORTANT: The 'comments' and 'reactors' fields require premium API access.
 * This script shows what data IS available and how to request access for comments.
 */

const CRUSTDATA_API_KEY = process.env.CRUSTDATA_API_KEY || 'ef714fbc7f785bec083c0ba90ac2b4164bc8126b';
const BASE_URL = 'https://api.crustdata.com';

// The LinkedIn post URL you want to analyze
// Original: https://www.linkedin.com/posts/hammad2_c0mpiled-2uae-the-adaptive-city-luma-activity-7420730134661365760-4t-l/
// The activity ID is: 7420730134661365760
const LINKEDIN_POST_URL = 'https://www.linkedin.com/feed/update/urn:li:activity:7420730134661365760';

/**
 * Fetch basic post data (available with standard access)
 */
async function fetchPostBasicData(postUrl) {
    // Don't specify fields - use defaults to avoid access issues
    const params = new URLSearchParams({
        linkedin_post_url: postUrl,
        limit: '1'
    });

    const url = `${BASE_URL}/screener/linkedin_posts?${params}`;

    console.log('🔍 Fetching post data...\n');

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${CRUSTDATA_API_KEY}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    return response.json();
}

/**
 * Fetch commenters (requires premium access)
 */
async function fetchPostWithCommenters(postUrl, maxComments = 50) {
    const params = new URLSearchParams({
        linkedin_post_url: postUrl,
        fields: 'comments,reactors',
        limit: '1',
        max_comments: maxComments.toString(),
        max_reactors: '100'
    });

    const url = `${BASE_URL}/screener/linkedin_posts?${params}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Token ${CRUSTDATA_API_KEY}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        const errorText = await response.text();
        return { error: true, message: errorText };
    }

    return response.json();
}

/**
 * Main function
 */
async function main() {
    console.log('='.repeat(60));
    console.log('🚀 LinkedIn Post Analyzer - Crustdata API');
    console.log('='.repeat(60));
    console.log(`\n📝 Post URL: ${LINKEDIN_POST_URL}\n`);

    try {
        // Step 1: Fetch basic post data (available fields)
        console.log('📥 Step 1: Fetching available post data...\n');
        const postData = await fetchPostBasicData(LINKEDIN_POST_URL);

        if (postData && Array.isArray(postData) && postData.length > 0) {
            const post = postData[0];

            console.log('✅ POST DATA RETRIEVED:');
            console.log('='.repeat(60));
            console.log(`👤 Author: ${post.actor_name || 'N/A'}`);
            console.log(`📅 Posted: ${post.date_posted || 'N/A'}`);
            console.log(`📝 Text: ${(post.text || '').substring(0, 200)}...`);
            console.log(`\n📊 ENGAGEMENT:`);
            console.log(`   💬 Total Comments: ${post.total_comments || 0}`);
            console.log(`   ❤️  Total Reactions: ${post.total_reactions || 0}`);
            console.log(`   🔄 Shares: ${post.num_shares || 0}`);

            if (post.reactions_by_type) {
                console.log(`\n   Reaction Breakdown:`);
                Object.entries(post.reactions_by_type).forEach(([type, count]) => {
                    if (count > 0) console.log(`   - ${type}: ${count}`);
                });
            }

            console.log(`\n🔗 Share URL: ${post.share_url || 'N/A'}`);

            if (post.hyperlinks?.person_linkedin_urls?.length > 0) {
                console.log(`\n👥 MENTIONED PEOPLE IN POST:`);
                post.hyperlinks.person_linkedin_urls.forEach((url, i) => {
                    console.log(`   ${i + 1}. ${url}`);
                });
            }
        }

        // Step 2: Try to fetch commenters (might fail without premium access)
        console.log('\n' + '='.repeat(60));
        console.log('📥 Step 2: Attempting to fetch commenters...');
        console.log('='.repeat(60));

        const commenterData = await fetchPostWithCommenters(LINKEDIN_POST_URL);

        if (commenterData.error) {
            console.log('\n⚠️  ACCESS LIMITATION DETECTED');
            console.log('-'.repeat(60));
            console.log('The "comments" and "reactors" fields require PREMIUM access.');
            console.log('\n📧 To get access to commenters data, you need to:');
            console.log('   1. Contact Crustdata support (abhilash@crustdata.com)');
            console.log('   2. Request access to "comments" and "reactors" fields');
            console.log('   3. They will upgrade your API token\n');
            console.log('📖 Documentation: https://api.crustdata.com/docs/discover/people-apis/people-linkedin-post-api');
        } else if (commenterData && Array.isArray(commenterData) && commenterData.length > 0) {
            const post = commenterData[0];

            if (post.comments?.length > 0) {
                console.log(`\n✅ COMMENTERS (${post.comments.length} found):`);
                post.comments.forEach((comment, i) => {
                    console.log(`\n${i + 1}. ${comment.author_name || 'Unknown'}`);
                    console.log(`   LinkedIn: ${comment.author_linkedin_url || 'N/A'}`);
                    console.log(`   Comment: ${(comment.text || '').substring(0, 100)}...`);
                });
            }

            if (post.reactors?.length > 0) {
                console.log(`\n✅ REACTORS (${post.reactors.length} found):`);
                post.reactors.slice(0, 10).forEach((reactor, i) => {
                    console.log(`${i + 1}. ${reactor.name} (${reactor.reaction_type})`);
                    console.log(`   ${reactor.linkedin_profile_url}`);
                });
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log('📋 FULL RAW RESPONSE:');
        console.log('='.repeat(60));
        console.log(JSON.stringify(postData, null, 2));

    } catch (error) {
        console.error('\n❌ Error:', error.message);
    }
}

// Run the script
main();
