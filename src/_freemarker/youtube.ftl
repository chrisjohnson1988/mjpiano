<#macro musicPlaylist playlistID maxResults="10">
	<ul class="youtube-music">
		<#list json.readURL("https://gdata.youtube.com/feeds/api/playlists/${playlistID}?v=2&max-results=${maxResults}&alt=jsonc").data.items as item>
			<li><a href="http://www.youtube.com/watch?v=${item.video.id}" rel="music" target="_blank">${item.video.title}</a></li>
		</#list>
	</ul>
</#macro>

<#macro videoPlaylist playlistID maxResults="10">
	<ul class="youtube-video">
		<#list json.readURL("https://gdata.youtube.com/feeds/api/playlists/${playlistID}?v=2&max-results=${maxResults}&alt=jsonc").data.items as item>
			<li>
				<a href="http://www.youtube.com/watch?v=${item.video.id}" title="" rel="video" target="_blank">
					<div class="youtube-image-wrapper">
						<img src="${item.video.thumbnail.sqDefault}" alt="${item.video.title}"/>
					</div>
					<span class="youtube-title">${item.video.title}</span>
				</a>
			</li>
		</#list>
	</ul>
</#macro>