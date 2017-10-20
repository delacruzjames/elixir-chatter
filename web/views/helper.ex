defmodule Chatter.ViewHelper do
  def current_user(conn) do
    Guardian.Plug.current_resource(conn)
  end

  def logged_in?(conn) do
    Guardian.Plug.authenticated?(conn)
  end
end
