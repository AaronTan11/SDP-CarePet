from sqlalchemy import Column, Integer, String, Date
from database import Base
from sqlalchemy.orm import relationship, Mapped


class User(Base):
    __tablename__ = "user"

    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String(250), unique=False, nullable=False)
    profile_pic = Column(String(255), nullable=False)
    user_role = Column(String(250), nullable=False)

    contact = Column(String(80), unique=False, nullable=True)
    bookings: Mapped[list["Booking"]] = relationship(
        "Booking", primaryjoin='foreign(Booking.user_id) == User.id')


class Booking(Base):
    __tablename__ = "booking"

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, nullable=False)
    name = Column(String(80), unique=False, nullable=False)
    contact = Column(String(80), unique=False, nullable=False)
    email = Column(String(250), unique=False, nullable=False)
    date = Column(Date, unique=False, nullable=False)
    service_type = Column(String(100), unique=False, nullable=False)
    pet_breed = Column(String(255), unique=False, nullable=False)


class AdoptionForm(Base):
    __tablename__ = "adoptionform"

    petid = Column(Integer, primary_key=True)
    name = Column(String(80), unique=True, nullable=False)
    contact = Column(String(80), unique=False, nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    estSalary = Column(Integer, unique=True, nullable=False)


class Pets(Base):
    __tablename__ = "pets"

    id = Column(Integer, primary_key=True)
    petname = Column(String(255), unique=True, nullable=False)
    Image = Column(String(255), nullable=True)
    description = Column(String(255), unique=False, nullable=False)


class Admin(Base):
    __tablename__ = "Admin"

    id = Column(Integer, primary_key=True)
    username = Column(String(80), unique=True, nullable=False)
    password = Column(String(250), unique=False, nullable=False)
