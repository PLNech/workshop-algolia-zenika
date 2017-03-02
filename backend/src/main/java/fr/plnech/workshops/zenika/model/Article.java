package fr.plnech.workshops.zenika.model;

import java.util.List;

public class Article {
    public String author;
    public String authorUrl;
    public int commentCount;
    public String description;
    public String image;
    public int publishedDate;
    public List<Tag> tags;
    public String title;
    public String url;
    public String objectId;

    public Article() {
    }
}
