/*
FUTURE REFACTOR: 1.2 makes it easy to make fields read-only with 
the readonly_fields attribute on ModelAdmin. When 1.2 adoption is
more wide-spread, we could make a lot of this javascript superfluous
*/

(function($){
	$(function(){

		function warning () {
			var minutes = locking.timeout/60;
			alert(interpolate(gettext("Your lock on this content will expire in a bit less than five minutes. Please save your content and navigate back to this edit page to close the content again for another %s minutes."), minutes));
		}
		
		function locking_mechanism (base_url, app, model, id) {
			// locking is pointless when the user is adding a new piece of content
			if (id == 'add') return
			// we disable all input fields pre-emptively, and subsequently check if the content
			// is or is not available for editing
			$(":input").attr("disabled", "disabled");
			
			$.getJSON(base_url + "/is_locked/", function(lock, status) {
				if (lock.applies && status != '404') {
				
					var notice = interpolate(gettext('<p class="is_locked">This content is currently being edited by <em>%(for_user)s</em>. You can read it but not edit it.</p>'), lock, true);
					
					$("#content").prepend(notice);
					
				} else {
					$(":input").removeAttr("disabled");
					
					$.get(base_url + "/lock/");
					
					$(window).unload(function(){
						// We have to assure that our unlock request actually gets
						// through before the user leaves the page, so it shouldn't
						// run asynchronously.
						
						$.ajax({'url': base_url + "/unlock/", 'async': false});
					})
				}
			})
			
			// We give users a warning that their lock is about to expire,  
			// five minutes before it actually does.
			setTimeout(warning, 1000*(locking.timeout-300));
		}
		
		function locking_toggle(base_url){
			//Locking toggle function
			$(".lock-status").click(function(){
			
				id = $(this).text();
				if ($(this).hasClass("locked")){
					if (confirm("Somebody is currently editing this article. Proceed with removing the lock?")) {
					
						$.ajax({'url': base_url + id + "/unlock/", 'async': false});
						
						$(this).toggleClass('locked');
						
						$(this).toggleClass('unlocked');
					}
				}
			
				return false;
			});
		}
		
		$(document).ready(function(){
			var app = $.url.segment(1);
			var model = $.url.segment(2);
			var id = $.url.segment(3);  
			var base_url = locking.base_url + "/" + [app, model, id].join("/");
		
			if ($("body").hasClass("change-form")) {
					locking_mechanism(base_url, app, model, id);
			}else if ($(".lock-status").length > 0){
					locking_toggle(base_url);
			}
		});

	});
 }(django.jQuery));