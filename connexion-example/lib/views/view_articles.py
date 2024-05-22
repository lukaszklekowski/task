from http import HTTPStatus
from flask import request
from connexion import NoContent
import datetime
from lib.models import Article, db


def get(user):
    release_date = request.args.get('release_date')
    try:
        release_date = int(release_date)
    except ValueError:
        return {"message": "The release_date must be a integer."}, HTTPStatus.BAD_REQUEST
    
    if not release_date:
        articles = Article.query.filter(
            Article.author_user_id == user['user_id']
        ).all()
    else:
        articles = Article.query.filter(
            Article.author_user_id == user['user_id'],
            Article.release_date >= datetime.date(release_date, 1, 1),
            Article.release_date <= datetime.date(release_date, 12, 31)
        ).all()

    return [
       {
           'article_id': article.article_id,
           'title': article.title,
           'content': article.content,
       }
       for article in articles
    ], HTTPStatus.OK

def post(user, body):
    db.session.add(Article(
        author_user_id=user['user_id'],
        title=body['title'],
        content=body['content'],
    ))
    db.session.commit()

    return NoContent, HTTPStatus.OK


def put(user, article_id, body):
    article = Article.query.filter(
        Article.article_id == article_id,
        Article.author_user_id == user['user_id'],
    ).first()

    if not article:
        return NoContent, HTTPStatus.NOT_FOUND

    article.title = body['title']
    article.content = body['content']
    db.session.commit()

    return NoContent, HTTPStatus.OK


def delete(user, article_id):
    Article.query.filter(
        Article.article_id == article_id,
        Article.author_user_id == user['user_id'],
    ).delete()

    db.session.commit()

    return NoContent, HTTPStatus.OK


