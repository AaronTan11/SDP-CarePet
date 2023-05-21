import hashlib


def get_gravatar_url(email):
    email_hash = hashlib.md5(email.lower().encode('utf-8')).hexdigest()
    return f"https://www.gravatar.com/avatar/{email_hash}?d=identicon"


def get_pet_image(petname):

    petname_hash = int(hashlib.md5(
        petname.lower().encode('utf-8')).hexdigest(), 16)

    width = 200 + (petname_hash % 101)
    height = 200 + ((petname_hash // 101) % 101)
    return f"https://place-puppy.com/{width}x{height}?q=best&f=jpg"
