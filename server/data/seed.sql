CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY,
    author VARCHAR(256) NOT NULL,
    image VARCHAR(256),
    content TEXT
);

INSERT INTO comments
    (author, image, content)
VALUES
    (
        'Rose and Paul Kean',
        NULL,
        "Uncle Doug, Paul, James and Susan.....our thoughts are with you all. Aunt Mabel was always a joy and always extremely welcoming in every aspect, whether she was sharing her possessions or her time. We are grateful for the laughs shared and will think of her often with great fondness."
    ),
    (
        'Rev. Jeff Ward',
        NULL,
        "All love and blessings to Susan and all of Mabel's family members."
    ),
    (
        'Christine Smith',
        NULL,
        "Hugs to everyone. I remember Mabel fondly from the Ventures. A great mom to all the ladies in gold."
    ),
    (
        'Gord and Lona Stone',
        NULL,
        "Doug, Ray and family, Lona and I send our sincere condolences. We are certain that the loss of Mabel is extremely difficult but we also know that the beautiful memories you hold dear will help ease the ache in your hearts. Celebrate her wonderful life and her constant love for her family and friends!"
    ),
    (
        'Gloria Rees',
        NULL,
        "To Doug and family. So sorry to hear of Mabel's passing. May she rest in peace and know the glory of God. An elegant and unique being with a beautiful presence. May you have much joy in her memories. Love from Gloria Rees and family."
    ),
    (
        'Susan Wilson',
        'susan-curling.jpg',
        "Amazing Grace Award .... sportsmanship, supporter, female skip, two new curlers."
    ),
    (
        'Stephen A. Wilson',
        NULL,
        "Thank you papa for all the help and support you've given me and David. Thank you for the wonderful winter holidays on that slide you built every winter at Lake St. Peter. Thanks for the Pontoon boating trips spent swimming in the lake. Thanks for the trip to Newfoundland to see the Bay of Fundy. Thanks for the weekends spent in Kitchener at your condo. Thanks for the laughs, and your sense of humor.\nPapa, I'm going to miss you."
    )
;
