defmodule Chatter.SessionController do
  use Chatter.Web, :controller

  def new(conn, _params) do
    render(conn, "new.html")
  end
end
