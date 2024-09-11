# Endpoints
Add New Candidate

## POST /candidates
- Request Body:
```
{
  "name": "string",
  "party": "string",
}
```
- Responses:
- 200 OK: Candidate added successfully.
```
{
  "message": "candidate saved",
  "candidate": {
    "name": "string",
    "party": "string",
    "voteCount": 0
  }
}
- 500 Internal Server Error: Error while adding the candidate.

{
  "error": "internal server error"
}
```

## Remove Candidate
Removes an existing candidate from the voting system by their ID.

## DELETE /candidates/:id
- Parameters:
- id (string): The candidate's ID.
- Responses:
- 200 OK: Candidate removed successfully.
```
{
  "message": "candidate deleted"
}
-404 Not Found: Candidate not found.
{
  "message": "candidate not found"
}
- 500 Internal Server Error: Error while removing the candidate.

{
  "error": "unable to delete"
}
```
## Vote for Candidate
Allows a user to vote for a candidate by their ID. The vote is tied to the user's account.
## POST /candidates/:id/vote
- Parameters:
- id (string): The candidate's ID.
- Request Body:
- None (the user is identified by req.user in the system).

- Responses:
- 200 OK: Vote cast successfully.
```
{
  "message": "voting successfully done"
}
- 404 Not Found: Candidate or user not found.

{
  "message": "candidate not found" // If candidate does not exist
}

{
  "message": "user not found" // If user does not exist
}
- 500 Internal Server Error: Error while voting.

{
  "message": "error occurred while voting",
  "err": "error message"
}
```
## See Vote Count
 View the vote counts for all candidates in descending order by vote count.

## GET /candidates/votes
- Responses:
- 200 OK: Vote counts retrieved successfully.
```
{
  "records": [
    {
      "name": "string",
      "party": "string",
      "voteCount": 10
    },
    {
      "name": "string",
      "party": "string",
      "voteCount": 5
    }
  ]
}
- 500 Internal Server Error: Error while retrieving vote counts.
{
  "error": "internal server error"
}
```
## See All Candidates
 View the list of all candidates along with their names and parties.

## GET /candidates
- Responses:
- 200 OK: List of candidates retrieved successfully.
```
{
  "canidates": [
    {
      "name": "string",
      "party": "string"
    },
    {
      "name": "string",
      "party": "string"
    }
  ]
}
- 500 Internal Server Error: Error while retrieving candidates.

{
  "error": "internal server error"
}
```
