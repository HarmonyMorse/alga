const supabase = require('../lib/supabaseClient');

describe('Database Operations', () => {
    let testUser;
    let testChallenge;

    beforeAll(async () => {
        // Create a test user
        const { data: { user }, error } = await supabase.auth.signUp({
            email: `test${Date.now()}@example.com`,
            password: 'testPassword123!'
        });
        if (error) throw error;
        testUser = user;

        // Create a test challenge
        const { data: challenge, error: challengeError } = await supabase
            .from('challenges')
            .insert({
                title: 'Test Challenge',
                description: 'Test Description'
            })
            .select()
            .single();
        if (challengeError) throw challengeError;
        testChallenge = challenge;
    });

    afterAll(async () => {
        // Clean up test data
        if (testChallenge) {
            await supabase
                .from('challenges')
                .delete()
                .eq('id', testChallenge.id);
        }
        if (testUser) {
            await supabase.auth.admin.deleteUser(testUser.id);
        }
    });

    describe('Challenges Table', () => {
        it('should allow reading challenges', async () => {
            const { data, error } = await supabase
                .from('challenges')
                .select('*')
                .eq('id', testChallenge.id);

            expect(error).toBeNull();
            expect(data).toHaveLength(1);
            expect(data[0].title).toBe('Test Challenge');
        });
    });

    describe('Solutions Table', () => {
        it('should allow creating solutions for authenticated users', async () => {
            const { data: solution, error } = await supabase
                .from('solutions')
                .insert({
                    user_id: testUser.id,
                    challenge_id: testChallenge.id,
                    solution_code: 'console.log("Hello World!");'
                })
                .select()
                .single();

            expect(error).toBeNull();
            expect(solution).toBeTruthy();
            expect(solution.user_id).toBe(testUser.id);
            expect(solution.challenge_id).toBe(testChallenge.id);
        });

        it('should allow users to read their own solutions', async () => {
            const { data, error } = await supabase
                .from('solutions')
                .select('*')
                .eq('user_id', testUser.id);

            expect(error).toBeNull();
            expect(data).toHaveLength(1);
            expect(data[0].solution_code).toBe('console.log("Hello World!");');
        });
    });
}); 