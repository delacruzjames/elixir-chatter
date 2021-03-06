# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :chatter,
  ecto_repos: [Chatter.Repo]

# Configures the endpoint
config :chatter, Chatter.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "CX0ebCwyvWiwbbt4ebzgq/SD4m4ftzhRiG0VmOag9McGiEvoRO5IFX4tCDBGqPPN",
  render_errors: [view: Chatter.ErrorView, accepts: ~w(html json)],
  pubsub: [name: Chatter.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configuration for Guardian
config :guardian, Guardian,
  allowed_algos: ["HS512"],
  verify_module: Guardian.JWT,
  issuer: "Chatter",
  ttl: {30, :days},
  allowed_drift: 2000,
  verify_issuer: true,
  secret_key: System.get_env("SECRET_KEY_BASE") || "Rc4Cum4MOfagVbxZNQRwAAapAsPZcYlEh8fTOWuLUTHWtc+cosq9BrmTZGD8CwP1",
  serializer: Chatter.GuardianSerializer

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
