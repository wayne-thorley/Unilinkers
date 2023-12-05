<?php

namespace Tests\Feature;

use App\Models\Property;
use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\Response;
use Illuminate\Support\Arr;
use Tests\TestCase;

class RoomControllersTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test list room.
     */
    public function test_list_room_returns_correct_data(): void
    {
        Room::factory(25)->create();

        $this->getJson('/api/room')
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonCount(20, 'data')
            ->assertJsonStructure([
                'data' => [
                    '*' => [
                        'id',
                        'property_id',
                        'name',
                        'size',
                        'created_at',
                        'updated_at',
                    ]
                ]
            ]);
    }

    /**
     * Test list room of property.
     */
    public function test_list_room_of_property_returns_correct_data(): void
    {
        $property1 = Property::factory()
            ->hasRooms(4)
            ->create();

        $property2 = Property::factory()
            ->hasRooms(2)
            ->create();

        $this->getJson(sprintf('/api/room?%s', Arr::query([
                'property_id' => $property1->getKey(),
            ])))
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonCount(4, 'data');

        $this->getJson(sprintf('/api/room?%s', Arr::query([
                'property_id' => $property2->getKey(),
            ])))
            ->assertStatus(Response::HTTP_OK)
            ->assertJsonCount(2, 'data');
    }

    /**
     * Test show room.
     */
    public function test_show_room_returns_correct_data(): void
    {
        $room = Room::factory()->create();

        $this->getJson(sprintf('/api/room/%s', $room->getKey()))
            ->assertStatus(Response::HTTP_OK)
            ->assertExactJson([
                'data' => [
                    'id' => $room->getKey(),
                    'property_id' => $room->property_id,
                    'name' => $room->name,
                    'size' => $room->size,
                    'created_at' => $room->created_at,
                    'updated_at' => $room->updated_at,
                ]
            ]);
    }

    /**
     * Test show room with invalid id.
     */
    public function test_show_room_with_invalid_id_is_unsucessful(): void
    {
        $this->getJson('/api/room/0')
            ->assertStatus(Response::HTTP_NOT_FOUND);
    }

    /**
     * Test store room.
     */
    public function test_store_room_is_successful(): void
    {
        $data = Room::factory()->make();

        $this->postJson('/api/room', [
                'property_id' => $data->property_id,
                'name' => $data->name,
                'size' => $data->size,
            ])
            ->assertStatus(Response::HTTP_CREATED)
            ->assertJsonStructure([
                'data' => [
                    'id',
                    'property_id',
                    'name',
                    'size',
                    'created_at',
                    'updated_at',
                ]
            ]);

        $this->assertDatabaseHas('rooms', $data->toArray());
    }

    /**
     * Test store room with missing data.
     */
    public function test_store_room_with_missing_data_is_unsuccessful(): void
    {
        $data = Room::factory()->make();

        $this->postJson('/api/room', [
                'property_id' => $data->property_id,
                'name' => $data->name,
                // 'size' => $data->size,
            ])
            ->assertStatus(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    /**
     * Test update room.
     */
    public function test_update_room_is_successful(): void
    {
        $room = Room::factory()->create();

        $data = Room::factory()->make([
            'property_id' => $room->property_id,
        ]);

        $this->putJson(sprintf('/api/room/%s', $room->getKey()), [
            'name' => $data->name,
            'size' => $data->size,
        ])
            ->assertStatus(Response::HTTP_OK)
            ->assertExactJson([
                'data' => [
                    'id' => $room->getKey(),
                    'property_id' => $room->property_id,
                    'name' => $data->name,
                    'size' => $data->size,
                    'created_at' => $room->created_at,
                    'updated_at' => $room->updated_at,
                ]
            ]);
    }

    /**
     * Test update room with invalid id.
     */
    public function test_update_room_with_invalid_id_is_unsucessful(): void
    {
        $this->putJson('/api/room/0')
            ->assertStatus(Response::HTTP_NOT_FOUND);
    }

    /**
     * Test destroy room.
     */
    public function test_destroy_room_is_successful(): void
    {
        $room = Room::factory()->create();

        $this->deleteJson(sprintf('/api/room/%s', $room->getKey()))
            ->assertStatus(Response::HTTP_NO_CONTENT);

        $this->assertDatabaseMissing('properties', $room->toArray());
    }

    /**
     * Test destroy room with invalid id.
     */
    public function test_destroy_room_with_invalid_id_is_unsucessful(): void
    {
        $this->deleteJson('/api/room/0')
            ->assertStatus(Response::HTTP_NOT_FOUND);
    }
}
