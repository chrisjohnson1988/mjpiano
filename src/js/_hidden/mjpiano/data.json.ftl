[#ftl]
[#macro create_json_snip href]
	[#import "/" + href + ".oftl" as currPage/]
	"${href}" : {
		"title": "${currPage.title}",
		"css": "${currPage.css}",
		"content" :"${currPage.content?json_string}"
	}
[/#macro]
{
	"content": {
		[#list json.readFile("/_freemarker/navigation.json") as currNav]
			[@create_json_snip currNav.href/] [#if currNav_has_next],[/#if]
		[/#list]
	},
	"navigation": [#include "/_freemarker/navigation.json"/]
}