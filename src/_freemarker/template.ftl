<#macro page href css title>
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
	<html>
		<head>
			<title>${title} - Mark Johnson</title>
			<meta name="google-site-verification" content="bIrOkZOGmbNTUHezFH2f7LfwocV4jWvoyKmaCvK06Fo" />
			<link href="css/mjpiano.css" rel="stylesheet" type="text/css" />
			<script type="text/javascript" src="js/importer.js"></script>
			<script type="text/javascript">
				$(document).ready(function() {
					var onloadFunc = mjpiano.onloadFuncs["${href}"];
					if(onloadFunc) onloadFunc($("#container .content"));
				});
			</script>
		</head>
		<body>
			<div id="container">
				<div id="header">
					<a href="index.htm" rel="author"><div id="logo"></div></a>
					<#include "_navigation.ftl"/>
				</div>
				<div class="section ${css}">
					<div class="content"><#nested></div>
				</div>
			</div>
			<div id="social">
				<div class="fb-like"><fb:like href="www.mjpiano.co.uk" layout="button_count" send="true" show_faces="false" font="arial"></fb:like></div>
				<a href="http://www.facebook.com/markmjpiano" target="_blank" title="View My Facebook Page"><span class="social-icon facebook"></span></a>
				<a href="http://twitter.com/mark_mjpiano" target="_blank" title="View My Twitter Page"><span class="social-icon twitter"></span></a>
				<a href="http://uk.linkedin.com/in/mjpiano" target="_blank" title="View My LinkedIn Page"><span class="social-icon linkedin"></span></a>
				<a href="https://profiles.google.com/111548012360394022250" rel="me" title="View My Google Plus Page"><span class="social-icon googleplus"></span></a>
				<a href="http://www.youtube.com/markmjpiano" target="_blank" title="View My Youtube Channel"><span class="social-icon youtube"></span></a>
				<a href="mailto:mark@mjpiano.co.uk" title="E-Mail Me"><span class="social-icon email"></span></a>
			</div>
			<div id="music-player"></div>
			<div id="copyright">Website created by Christopher Johnson. Images By <a href="http://hdr.co" target="_blank">Sean Mitchell</a></div>
		</body>
	</html>
</#macro>