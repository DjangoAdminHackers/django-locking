Developers' documentation
=========================

The public API
--------------

``django-locking`` has a concise API, revolving around the ``LockableModel``. You can read more about how to interact with this API in :doc:`api`.

Running the test suite
----------------------

Before running the test suite, make sure you've added ``locking`` and ``locking.tests`` to your ``INSTALLED_APPS`` in ``settings.py``. Also add ``(r'^ajax/admin/', include(locking.urls)),`` to your urlconf (don't forget ``import locking``). You may then run the test suite using ``python manage.py test locking``.

Building the documentation
--------------------------

Building the documentation can be done by cd'ing to the ``/docs`` directory and executing ``make build html``. The documentation for Sphinx (the tool used to build the documentation) can be found here__, and a reStructured Text primer, which explains the markup language can be found here__.

.. __: http://sphinx.pocoo.org/index.html

.. __: http://sphinx.pocoo.org/rest.html

Help out
--------

If you'd like to help out with further development: fork away!

Design and other resources
--------------------------

You can learn a bit more about the rationale behind how ``django-locking`` works over at :doc:`design`.

You might also want to check out these web pages and see what kind of locking solutions are already out there: 

* http://www.reddit.com/r/django/comments/c8ts2/edit_locking_in_the_admin_anyone_ever_done_this/
* http://stackoverflow.com/questions/698950/what-is-the-simplest-way-to-lock-an-object-in-django
* http://djangosnippets.org/tags/lock/