from sqlalchemy import Column, Integer, String
from database import Base
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Mapped


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(250), unique=False, nullable=False)
