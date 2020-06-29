db.createUser(
    {
        user : "krcul",
        pwd : "SecretPWD8520",
        roles : [
            {
                role : "readWrite",
                db : "dronemasterproef"
            }
        ]
    }
)