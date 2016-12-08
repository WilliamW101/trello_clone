json.extract! board, :id, :name, :created_at, :updated_at
json.url board_url(board, format: :json)

json.lists board.lists do |list|
  json.id list.id
  json.title list.title
end


# {
#   id: 1,
#   name: 'PBR',
#   created_at: '13492384'
#   updated_at: '13492384'
#   url: 'http://localhost:3000/boards/1',
#   lists: [
#           {id: 1, title: 'Drink Beer'},
#           {id: 2, title: 'Stuff'},
#          ]
# }
