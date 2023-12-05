<?php

namespace Tests\Feature;

use App\Models\Property;
use App\Models\Room;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Schema;
use Tests\TestCase;

class PropertyTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test property database columns.
     */
    public function test_property_has_correct_database_columns(): void
    {
        $this->assertTrue(Schema::hasColumns('properties', [
            'id',
            'name',
            'address',
            'created_at',
            'updated_at',
        ]));
    }

    /**
     * Test property has many rooms.
     */
    public function test_property_has_many_rooms(): void
    {
        $property = Property::factory()->create();

        $rooms = Room::factory(3)->create([
            'property_id' => $property->getKey(),
        ]);

        $this->assertInstanceOf(Collection::class, $property->rooms);
        $this->assertEquals(3, $property->rooms->count());
    }
}
