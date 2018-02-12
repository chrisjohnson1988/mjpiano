---
title: Music
navId: Music
css:   music

music:
  - title: Glasgow Love Theme
    vid:   8LPJAH1Rrb0
  - title: June Sundown - Mark Johnson
    vid:   oWWHOqvagCQ
  - title: For You - Mark Johnson
    vid:   6mlmd9B49kE
  - title: Angel Of Love - Mark Johnson
    vid:   r2_8L70cHeQ
  - title: Walking On Clouds - Mark Johnson
    vid:   p45G5j4RtAo
  - title: Bridgewater - Mark Johnson
    vid:   AN8wZQDGqk0
  - title: Sorry - Mark Johnson
    vid:   gGFslILMDKI
  - title: Enlightenment - Mark Johnson
    vid:   UqFkbIM157E
  - title: West Coast - Mark Johnson
    vid:   HMFlSrKFaIg

video:
  - title: Misty
    vid:   c5EO9wVxrxg
  - title: Moon River
    vid:   ca3c9yhwit4
---

# Music

Here are some of Mark's own compositions and renditions.

<ul class="youtube-video">
  {% for item in page.video %}
    <li>
      <a href="http://www.youtube.com/watch?v={{item.vid}}" title="" rel="video" target="_blank">
        <img src="https://i1.ytimg.com/vi/{{item.vid}}/default.jpg" alt="{{item.title}}"/>
        <span class="youtube-title">{{item.title}}</span>
      </a>
    </li>
  {% endfor %}
</ul>

<ul class="youtube-music">
  {% for item in page.music %}
    <li><a href="http://www.youtube.com/watch?v={{item.vid}}" rel="music" target="_blank">{{item.title}}</a></li>
  {% endfor %}
</ul>