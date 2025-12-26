from enum import Enum

from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, UniqueConstraint, Enum as SQLEnum


class Status(str, Enum):
    PENDING = 'pending'
    APPROVED = 'approved'
    REJECTED = 'rejected'


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = 'users'
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(nullable=False, index=True, unique=True)
    email: Mapped[str] = mapped_column(nullable=False, unique=True)
    hashed_password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(default=True, nullable=False)
    
    completions: Mapped[list['Completion']] = relationship(back_populates='user')


class Demon(Base):
    __tablename__ = 'demons'
    
    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    name: Mapped[str] = mapped_column(nullable=False, index=True)
    creator: Mapped[str] = mapped_column(nullable=False)
    verifier: Mapped[str] = mapped_column(nullable=False)
    ranking: Mapped[int] = mapped_column(nullable=False, index=True)
    level_id: Mapped[int] = mapped_column(nullable=False, unique=True)
    preview_link: Mapped[str | None]
    thumbnail: Mapped[str | None]
    points: Mapped[float] = mapped_column(nullable=False)
    
    completions: Mapped[list['Completion']] = relationship(back_populates='demon')


class Completion(Base):
    __tablename__ = 'completions'
    __table_args__ = (
        UniqueConstraint('user_id', 'demon_id', name='uq_user_demon'),
    )

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    demon_id: Mapped[int] = mapped_column(ForeignKey('demons.id'), nullable=False)
    proof_link: Mapped[str | None] # ! Store in AWS S3 later
    status: Mapped[Status] = mapped_column(
        SQLEnum(Status, name="completion status"),
        default=Status.PENDING,
        nullable=False
    )

    user: Mapped['User'] = relationship(back_populates='completions')
    demon: Mapped['Demon'] = relationship(back_populates='completions')
