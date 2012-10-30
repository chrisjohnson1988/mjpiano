<#macro img src local=true extra...>
	<#assign operation><#if local>readFile<#else>readUrl</#if></#assign>
	<#assign dimension = image[operation](src) />
	<img src="${src?html}" width="${dimension.width}" height="${dimension.height}" <#list extra?keys as attr>${attr}="${extra[attr]?html}"</#list>>
</#macro>