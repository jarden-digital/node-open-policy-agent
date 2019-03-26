package opa.example

bindings = [
  {
    "user": "testUser1",
    "roles": [
      "testRole1"
    ]
  },
  {
    "user": "testUser2",
    "roles": [
      "testRole1"
    ]
  }
]

roles = [
  {
    "name": "testRole1",
    "permissions": [
      {
        "resource": "testResource1",
        "action": "read"
      },
      {
        "resource": "testResource2",
        "action": "read"
      }
    ]
  },
  {
    "name": "testRole2",
    "permissions": [
      {
        "resource": "testResource3",
        "action": "read"
      }
    ]
  }
]

default allow = false

allow {
    user_has_role[role_name]
    role_has_permission[role_name]
}

user_has_role[role_name] {
    binding := bindings[_]
    binding.user = input.subject
    role_name := binding.roles[_]
}

role_has_permission[role_name] {
    role := roles[_]
    role_name := role.name
    perm := role.permissions[_]
    perm.resource = input.resource
    perm.action = input.action
}
