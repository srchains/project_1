from pydantic import BaseModel

class UserBase(BaseModel):
    name: str
    email: str
    mobile: str
    age: int

class UserCreate(UserBase):
    pass

class UserUpdate(UserBase):
    pass

class UserResponse(UserBase):
    id: int

    class Config:
        orm_mode = True