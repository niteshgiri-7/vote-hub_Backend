# Vote-Hub API
## Overview
**Vote-Hub is a voting platform API designed to handle elections where admins can create elections,and manage candidates. It allows users to participate as voters by joining elections and caste a vote. Admins and Voters have their specific roles.**

## Features
### Admin

**Admin Key Generation**: Admins must have an admin key(described later to get a key) to sign up as an admin.

**Sign Up as Admin**: Admins use the generated key to complete their registration.

**Create Election**: Admins can create multiple elections.

**Add Candidates**: Admins can add candidates to the elections they have created.

**View Created Elections**: Admins can view the list of elections they have created.

**Authorization**: Admins can only manage the elections they have personally created.

### Voter
**Sign Up as Voter**: Users can sign up as voters.

**Join Elections**: Voters must join elections to be eligible vote.
 Cannot join already(started/ended) elections.

**Vote**: Voters can cast a single vote for one candidate per election they have joined.

**View Joined Elections**: Voters can only view the list of elections they have joined.

**See Vote Counts**: Voters can only view vote counts of the candidates in the elections they have joined.

## API Workflow
 ### Admin Registration:

- Generate an admin key.
- Use the key to sign up as an admin.

### Election Management Admin:
- can  creates an election.
- can  adds candidates to the election.
- can view a list of elections they have created.

### Voter Registration:

- Voter signs up as a voter.
- Voter joins election using election Id.
- Voter casts a vote for a single candidate in the (participated)election.
- Voter views vote counts of candidates in elections they have joined.

## Rules and Restrictions
- Admins are authorized only for the elections they have created.
- Voters must join elections to be able to vote.
- Voters cannot join an election after it has started or ended.
- Voters can only vote once per election and only for candidates in the elections they have joined.
- Vote counts are only visible to voters for elections they have joined.