from sqlalchemy import Column, Integer, String, Date
from database import Base
from sqlalchemy.orm import mapped_column
from sqlalchemy.orm import Mapped


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(250), unique=False, nullable=False)

class Booking(Base):
    __tablename__ = "booking"

    id = Column(Integer, primary_key=True)
    name = Column(String(80), unique=True, nullable=False)
    contact = Column(String(80), unique=False, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    Date = Column(Date, unique=True, nullable=False)

class AdoptionForm(Base):
    __tablename__ = "adoptionform"

    petID = Column(Integer, primary_key=True)
    name = Column(String(80), unique=True, nullable=False)
    contact = Column(String(80), unique=False, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    estSalary = Column(Integer, unique=True, nullable=False)

class AdminAddDog(Base):
    __tablename__ = "AdminAddDog"

    petID = Column(Integer, primary_key=True)
    Dogname = Column(String(80), unique=True, nullable=False)
    Image = Column(String(20), nullable=True)    
    desription = Column(String(80), unique=False, nullable=False)

class Admin(Base):
    __tablename__ = "Admin"

    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    password = Column(String(250), unique=False, nullable=False)



    


