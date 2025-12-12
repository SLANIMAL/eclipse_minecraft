import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { StoreService } from './store.service';

@ApiTags('store')
@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Get('categories')
  @ApiOperation({ summary: 'List store categories' })
  @ApiResponse({ status: 200, description: 'Categories retrieved successfully' })
  listCategories() {
    return this.storeService.listCategories();
  }

  @Get('items')
  @ApiOperation({ summary: 'List store items (optional filter by category slug)' })
  @ApiResponse({ status: 200, description: 'Items retrieved successfully' })
  listItems(@Query('category') categorySlug?: string) {
    return this.storeService.listItems(categorySlug);
  }

  @Get('items/:id')
  @ApiOperation({ summary: 'Get a single store item by id' })
  @ApiResponse({ status: 200, description: 'Item retrieved successfully' })
  getItem(@Param('id') id: string) {
    return this.storeService.getItem(id);
  }
}
