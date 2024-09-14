
## API Reference
**base URL:** **`vote-hub.onrender.com`**
#### Get admin key

```http
GET /admin/get-admin-key
```

### Sign up
```http
POST /signUp
```
#### request body :

```
{
  "name": string,                
  "number": string,              
  "age": string,                
  "address": string,             
  "role": string,                // Required: Either "voter" or "admin", default "voter"
  "key": string | null,          // Optional: Admin key (required for admin), null for voters
  "citizenshipNo": string,
  "password": string            
}

```
#### response :
```
{
    "token": token,
    "message": "user created successfully",
    "id": userId,
    "role": admin/voter
}

```



### Login

``` http
POST /login
```
#### request body :
```
{
    "citizenshipNo":string,
    "password":string
}
```

#### response :
```
{
    "token": token,
    "message": "login successful",
    "id": userId,
    "role": admin/voter
}
```

### view profile

```http
GET /profile/:id
```

## Admin routes

###  create elections
```http
POST /admin/create-election
```
#### request body :

```
{
  "name": Election Name,
  "description":Election Description,
  "startsAt": Date,
  "endsAt": Date
}

```

#### response :
```
{
        "name": Election Name,
        "description": Election Description,
        "startsAt": Date,
        "endsAt": Date,
        "createdBy": adminId,
        "candidates": [],
        "_id": electionid,
    }

```

### get all elections (for admin)

```http
GET /admin/view/all-elections
```

```
{
    "message": [
        {
            "_id": Election Id,
            "name": Election Name,
            "description": Electoin Description,
            "startsAt": Date,
            "endsAt": Date,
            "createdBy": AdminId,
            "candidates": [] //to be added
        },
        {
          ...other elections created by the request doer(admin)
        }
    ]
}

```

### add candidate to an election

```http
POST /admin/election/:id/add-candidate
```


#### request body :


```
{
"name": candidate name,
"age": candidate age,
"party": candidate party,
"regNo": candidate registration number,
"electionId": candidate election id
}
```

#### delete candidate from an election

```http
DELETE /admin/election/:electionId/candidate/:id
```

## Voter routes

### join election
requires election Id as params
```http
POST /voter/join-election/:id 
```


### view joined elections

```http
GET /voter/view/joined-elections
```

### caste vote

```http
POST /voter/vote/election/:electionId/candidate/:id
```
## Election Routes

### to view the vote counts of ongoing elections

```http
GET /election/:id/vote-counts
```

### view result after completion of the election

```http
GET /election/:id/result
```

### User Profile settings

### view profile
```http
GET /users/profile/:id
```
### change password
```http
GET /users/profile/password
```
