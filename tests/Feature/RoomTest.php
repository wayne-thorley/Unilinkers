<?php

namespace Tests\Feature;

use App\Models\Property;
use App\Models\Room;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class RoomTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test room database columns.
     */
    public function test_room_has_correct_database_columns(): void
    {
        $this->assertTrue(Schema::hasColumns('rooms', [
            'id',
            'property_id',
            'name',
            'size',
            'created_at',
            'updated_at',
        ]));
    }

    /**
     * Test room belongs to property.
     */
    public function test_room_belongs_to_property(): void
    {
        $property = Property::factory()->create();

        $room = Room::factory()->create([
            'property_id' => $property->getKey(),
        ]);

        $this->assertInstanceOf(Property::class, $room->property);
    }
}
