.. image:: logo.png
  :width: 200
  :alt: Sheriff logo
  :align: center

====================
Sheriff Setup Action
====================

-----
About
-----

This is a Github Action that sets up the environment for
`Sheriff <https://github.com/gofrontier-com/sheriff>`_, a command line tool to
manage Azure role-based access control (Azure RBAC) and Microsoft Entra
Privileged Identity Management (Microsoft Entra PIM) using desired state configuration.

-----
Usage
-----

~~~~~~~~~~~~~~~~~~~~~~
Sheriff Setup action
~~~~~~~~~~~~~~~~~~~~~~

This task fetches and unpacks the Sheriff CLI tool.

.. code:: yaml

  steps:
    - name: Setup Sheriff
      uses: gofrontier-com/sheriff-setup-action@main

------------
Contributing
------------

We welcome contributions to this repository. Please see `CONTRIBUTING.md <https://github.com/gofrontier-com/sheriff-setup-action/tree/main/CONTRIBUTING.md>`_ for more information.
